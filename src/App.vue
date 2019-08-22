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
            <b-checkbox native-value="lowerCase" v-model="characters" @input="verify">a-z</b-checkbox>
          </b-field>
          <b-field>
            <b-checkbox native-value="upperCase" v-model="characters" @input="verify">A-Z</b-checkbox>
          </b-field>
          <b-field>
            <b-checkbox native-value="number" v-model="characters" @input="verify">0-9</b-checkbox>
          </b-field>
          <b-field>
            <b-checkbox native-value="symbol" v-model="characters" @input="verify">!@#$%^*&amp;</b-checkbox>
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
  private characters: string[] = ['lowerCase', 'upperCase', 'number'];
  private password: string = '';
  private btnDisabled: boolean = true;
  private passwordSuccess: boolean = false;
  private avoidAmbChar: boolean = true;
  private symbolNum: number = 0;
  private numberNum: number = 0;
  private upperCaseNum: number = 0;
  private lowerCaseNum: number = 0;

  private verify() {
    if (
      this.tag.length !== 0 &&
      this.pwd.length !== 0 &&
      this.characters.length
    ) {
      this.btnDisabled = false;
    } else {
      this.btnDisabled = true;
      this.passwordSuccess = false;
    }
  }

  private generate() {
    const tagMd5: string = md5(this.tag);
    const pwdMd5: string = md5(this.pwd);
    const tagAndPwdMd5: string = md5(tagMd5 + pwdMd5);
    this.getCharactersNum();
    this.password = tagAndPwdMd5;
    this.passwordSuccess = true;
  }

  private getCharactersNum() {
    if (this.characters.includes('symbol')) {
      this.symbolNum = Math.floor(this.length / this.characters.length);
      console.log(`特殊字符: ${this.symbolNum}`);
    }
    if (this.characters.includes('number')) {
      if (
        !(
          this.characters.includes('upperCase') ||
          this.characters.includes('lowerCase')
        )
      ) {
        this.numberNum = this.length - this.symbolNum;
      } else {
        this.numberNum = Math.floor(this.length / this.characters.length);
      }
      console.log(`数字: ${this.numberNum}`);
    }
    if (this.characters.includes('upperCase')) {
      if (!this.characters.includes('lowerCase')) {
        this.upperCaseNum = this.length - this.symbolNum - this.numberNum;
      } else {
        this.upperCaseNum = Math.floor(
          (this.length - this.symbolNum - this.numberNum) / 2,
        );
      }
      console.log(`大写字母: ${this.upperCaseNum}`);
    }
    if (this.characters.includes('lowerCase')) {
      this.lowerCaseNum =
        this.length - this.symbolNum - this.numberNum - this.upperCaseNum;
      console.log(`小写字母: ${this.lowerCaseNum}`);
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
