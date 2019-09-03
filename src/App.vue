<template>
  <div class="app">
    <div class="columns is-mobile is-gapless">
      <div class="column is-one-third">
        <b-button type="is-light" class="setting-btn" icon-right="settings" />
      </div>
      <div class="column is-one-third">
        <img alt="Vue logo" src="./assets/logo.png" />
      </div>
      <div class="column is-one-third">
        <GithubCorner url="https://github.com/Petrichor/HexPass" />
      </div>
    </div>
    <div class="columns is-centered is-gapless app-body">
      <div class="column is-one-third">
        <b-field label="标签">
          <b-input icon="tag" v-model="tag" @input="verify" />
        </b-field>
        <b-field label="密码">
          <b-input
            type="password"
            icon="textbox-password"
            password-reveal
            v-model="pwd"
            @input="verify"
          />
        </b-field>
        <b-collapse :open="false" class="card" aria-id="advanced">
          <template #trigger="triggerStatus">
            <div class="card-header" role="button" aria-controls="advanced">
              <p class="card-header-title">高级</p>
              <a class="card-header-icon">
                <b-icon type="is-primary" :icon="triggerStatus.open ? 'menu-down' : 'menu-left'" />
              </a>
            </div>
          </template>
          <div class="card-content">
            <label class="label is-small">长度</label>
            <b-field>
              <b-slider :min="4" :max="32" v-model="length" rounded />
            </b-field>
            <label class="label is-small">字符</label>
            <b-field>
              <b-checkbox v-model="hasLowerCase" @input="verify">小写字母</b-checkbox>
            </b-field>
            <b-field>
              <b-checkbox v-model="hasUpperCase" @input="verify">大写字母</b-checkbox>
            </b-field>
            <b-field>
              <b-checkbox v-model="hasNumber" @input="verify">数字</b-checkbox>
            </b-field>
            <b-field>
              <b-checkbox v-model="hasSymbol" @input="verify">符号</b-checkbox>
            </b-field>
            <b-field>
              <b-checkbox v-model="avoidAmbChar">排除易混淆</b-checkbox>
            </b-field>
          </div>
        </b-collapse>
        <div class="generate-btn">
          <b-button
            type="is-primary"
            class="is-centered"
            :disabled="btnDisabled"
            @click="generate"
            v-clipboard:copy="password"
            v-clipboard:success="onCopySuccess"
            v-clipboard:error="onCopyError"
          >生成</b-button>
        </div>
        <b-message v-show="passwordSuccess">
          <nav class="level column">
            <p class="level-item title wrap-p" ref="passwordText">
              <strong>{{password}}</strong>
            </p>
          </nav>
        </b-message>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import md5 from 'js-md5';
import GithubCorner from './components/GithubCorner.vue';
@Component({
  components: {
    GithubCorner,
  },
})
export default class App extends Vue {
  private tag: string = '';
  private pwd: string = '';
  private length: number = 10;
  private hasSymbol: boolean = false;
  private hasNumber: boolean = true;
  private hasUpperCase: boolean = true;
  private hasLowerCase: boolean = true;
  private characterTypeNum: number = 3;
  private password: string = '';
  private btnDisabled: boolean = true;
  private passwordSuccess: boolean = false;
  private avoidAmbChar: boolean = false;
  private symbolNum: number = 0;
  private numberNum: number = 0;
  private upperCaseNum: number = 0;
  private lowerCaseNum: number = 0;
  private symbolCharsArray: string[] = [];
  private numberCharsArray: string[] = [];
  private upperCaseCharsArray: string[] = [];
  private lowerCaseCharsArray: string[] = [];

  private verify() {
    this.characterTypeNum = this.getCharacterTypeNum();
    if (this.tag.length != 0 && this.pwd.length != 0 && this.characterTypeNum != 0) {
      this.btnDisabled = false;
    } else {
      this.btnDisabled = true;
      this.passwordSuccess = false;
    }
  }

  private generate() {
    const tagMd5: string = md5(this.tag);
    const pwdMd5: string = md5(this.pwd);
    const tagAndPwdMd5Array: string[] = md5(tagMd5 + pwdMd5).split('');
    const passwordMd5Array: string[] = tagAndPwdMd5Array.splice(0, this.length);
    const passwordArray: string[] = new Array(this.length);

    this.getEachTypeCharsNum();
    this.initChars();

    passwordMd5Array.forEach((value, index) => {
      const itemInt: number = parseInt(value, 16);
      let char: string = '';
      let cursor: number = 0;
      for (let i = 0; i <= itemInt; i++) {
        if (passwordArray[cursor] != undefined) {
          i--;
        }
        if (i != itemInt) {
          cursor = cursor == this.length - 1 ? 0 : cursor + 1;
        }
      }

      if (index < this.symbolNum) {
        char = App.getChar(this.symbolCharsArray, itemInt);
      } else if (index < this.numberNum) {
        char = App.getChar(this.numberCharsArray, itemInt);
      } else if (index < this.upperCaseNum) {
        char = App.getChar(this.upperCaseCharsArray, itemInt);
      } else {
        char = App.getChar(this.lowerCaseCharsArray, itemInt);
      }
      passwordArray[index] = char;
    });

    this.password = passwordArray.join('');
    this.passwordSuccess = true;
  }

  private initChars() {
    if (this.avoidAmbChar) {
      this.symbolCharsArray = '@#$%^&*+-'.split('');
      this.numberCharsArray = '23456789'.split('');
      this.upperCaseCharsArray = 'ABDEFGHJLMNQRTY'.split('');
      this.lowerCaseCharsArray = 'abdefghjmnqrty'.split('');
    } else {
      this.symbolCharsArray = '!@#$%^&*+-'.split('');
      this.numberCharsArray = '0123456789'.split('');
      this.upperCaseCharsArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      this.lowerCaseCharsArray = 'abcdefghijklmnopqrstuvwxyz'.split('');
    }
  }

  private getCharacterTypeNum(): number {
    const characterTypes: boolean[] = [this.hasSymbol, this.hasNumber, this.hasUpperCase, this.hasLowerCase];
    return characterTypes.reduce((total, element) => (element ? total + 1 : total), 0);
  }

  private getEachTypeCharsNum() {
    if (this.hasSymbol) {
      this.symbolNum = Math.floor(this.length / this.characterTypeNum);
    }
    if (this.hasNumber) {
      if (!(this.hasUpperCase || this.hasLowerCase)) {
        this.numberNum = this.length - this.symbolNum;
      } else {
        this.numberNum = Math.floor(this.length / this.characterTypeNum);
      }
    }
    if (this.hasUpperCase) {
      if (!this.hasLowerCase) {
        this.upperCaseNum = this.length - this.symbolNum - this.numberNum;
      } else {
        this.upperCaseNum = Math.floor((this.length - this.symbolNum - this.numberNum) / 2);
      }
    }
    if (this.hasLowerCase) {
      this.lowerCaseNum = this.length - this.symbolNum - this.numberNum - this.upperCaseNum;
    }
  }

  public static getChar(charsArray: string[], index: number): string {
    if (index < charsArray.length) {
      return charsArray[index];
    }
    return charsArray[index % charsArray.length];
  }

  public static selectText(element: Element) {
    const range = document.createRange();
    range.selectNode(element);
    const selection: Selection | null = window.getSelection();
    if (selection != null) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  private onCopySuccess() {
    this.$buefy.toast.open({
      duration: 800,
      message: '已复制到剪切板',
      position: 'is-bottom',
      type: 'is-success',
    });
  }

  private onCopyError() {
    App.selectText(this.$refs.passwordText as Element);
    this.$buefy.toast.open({
      duration: 3000,
      message: '自动复制失败，请手动复制',
      position: 'is-bottom',
      type: 'is-danger',
    });
  }
}
</script>
<style>
.setting-btn {
  margin: 0.75rem;
}
.app-body {
  padding: 0.75rem;
}
.generate-btn {
  display: flex;
  justify-content: center;
  margin: 1rem;
}
.wrap-p {
  word-break: break-all;
}
</style>
