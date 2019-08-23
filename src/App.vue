<template>
  <div class="app">
    <GithubCorner url="https://github.com/Petrichor/HexPass" />
    <div class="column is-4 is-offset-4">
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
            <b-checkbox v-model="hasLowerCase" @input="verify">a-z</b-checkbox>
          </b-field>
          <b-field>
            <b-checkbox v-model="hasUpperCase" @input="verify">A-Z</b-checkbox>
          </b-field>
          <b-field>
            <b-checkbox v-model="hasNumber" @input="verify">0-9</b-checkbox>
          </b-field>
          <b-field>
            <b-checkbox v-model="hasSymbol" @input="verify">!@#$%^*&amp;</b-checkbox>
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
      <b-message v-if="passwordSuccess">
        <nav class="level column">
          <p class="level-item title wrap-p">
            <strong>{{password}}</strong>
          </p>
        </nav>
      </b-message>
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
  private avoidAmbChar: boolean = true;

  private verify() {
    this.characterTypeNum = this.getCharacterTypeNum();
    if (this.tag.length !== 0 && this.pwd.length !== 0 && this.characterTypeNum !== 0) {
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
    passwordMd5Array.forEach((value, index) => {
      const itemInt: number = parseInt(value, 16);
      for (let i = 0; i < passwordArray.length; i += 1) {
        console.log(1);
      }
    });
    // this.password = tagAndPwdMd5;
    this.passwordSuccess = true;
  }

  private getCharacterTypeNum(): number {
    const characterTypes: boolean[] = [this.hasSymbol, this.hasNumber, this.hasUpperCase, this.hasLowerCase];
    return characterTypes.reduce((total, element) => (element ? total + 1 : total), 0);
  }

  private getEachTypeCharsNum() {
    let symbolNum: number = 0;
    let numberNum: number = 0;
    let upperCaseNum: number = 0;
    let lowerCaseNum: number = 0;

    if (this.hasSymbol) {
      symbolNum = Math.floor(this.length / this.characterTypeNum);
    }
    if (this.hasNumber) {
      if (!(this.hasUpperCase || this.hasLowerCase)) {
        numberNum = this.length - symbolNum;
      } else {
        numberNum = Math.floor(this.length / this.characterTypeNum);
      }
    }
    if (this.hasUpperCase) {
      if (!this.hasLowerCase) {
        upperCaseNum = this.length - symbolNum - numberNum;
      } else {
        upperCaseNum = Math.floor((this.length - symbolNum - numberNum) / 2);
      }
    }
    if (this.hasLowerCase) {
      lowerCaseNum = this.length - symbolNum - numberNum - upperCaseNum;
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
.generate-btn {
  display: flex;
  justify-content: center;
  margin: 1rem;
}
.wrap-p {
  word-break: break-all;
}
</style>
