<template>
  <div class="app">
    <div class="columns is-mobile is-gapless">
      <div class="column is-one-third">
        <b-dropdown v-model="languageSelect" aria-role="list">
          <button id="language-btn" class="button is-light" type="button" slot="trigger">
            <icon :path="mdiTranslate" />
          </button>
          <b-dropdown-item :value="'en'" aria-role="listitem">English</b-dropdown-item>
          <b-dropdown-item :value="'zh-Hans'" aria-role="listitem">简体中文</b-dropdown-item>
          <b-dropdown-item :value="'zh-Hant'" aria-role="listitem">繁體中文</b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="column is-one-third has-text-centered">
        <figure class="image is-128x128 is-inline-block">
          <img alt="HexPass logo" src="./assets/logo.png" />
        </figure>
      </div>
      <div class="column is-one-third">
        <github-corner url="https://github.com/hexpass/generator" />
      </div>
    </div>
    <div class="columns is-centered is-gapless app-body">
      <div class="column is-one-third" @keyup.enter="generate">
        <div class="field">
          <label class="label">{{text.get('label')}}</label>
          <p class="control has-icons-left">
            <input class="input" v-model="tag" @input="verify" />
            <icon :path="mdiTag" class="is-left" />
          </p>
        </div>
        <div class="field">
          <label class="label">{{text.get('password')}}</label>
          <p class="control has-icons-left has-icons-right">
            <input
              ref="inputPassword"
              class="input"
              :type="passwordInputType"
              password-reveal
              v-model="pwd"
              @input="verify"
            />
            <icon :path="mdiTextboxPassword" class="is-left" />
            <icon
              id="password-eye"
              :path="iconEye"
              class="is-right is-clickable"
              @click.native="togglePasswordVisibility"
            />
          </p>
        </div>
        <b-collapse :open="false" class="card" aria-id="advanced">
          <template #trigger="triggerStatus">
            <div class="card-header" role="button" aria-controls="advanced">
              <p class="card-header-title">{{text.get('advanced')}}</p>
              <a class="card-header-icon">
                <icon
                  class="has-text-primary"
                  :path="triggerStatus.open ? mdiMenuDown : mdiMenuLeft"
                />
              </a>
            </div>
          </template>
          <div class="card-content">
            <label class="label is-small">{{text.get('length')}}</label>
            <div class="field">
              <b-slider :min="4" :max="32" v-model="length" @input="verify" rounded />
            </div>
            <label class="label is-small">{{text.get('version')}}</label>
            <div class="field">
              <b-slider :min="1" :max="8" v-model="version" @input="verify" rounded />
            </div>
            <label class="label is-small">{{text.get('structure')}}</label>
            <div class="field">
              <b-checkbox v-model="hasLowerCase" @input="verify">{{text.get('lowercase')}}</b-checkbox>
            </div>
            <div class="field">
              <b-checkbox v-model="hasUpperCase" @input="verify">{{text.get('uppercase')}}</b-checkbox>
            </div>
            <div class="field">
              <b-checkbox v-model="hasNumber" @input="verify">{{text.get('number')}}</b-checkbox>
            </div>
            <div class="field">
              <b-checkbox v-model="hasSymbol" @input="verify">{{text.get('symbol')}}</b-checkbox>
            </div>
            <div class="field">
              <b-checkbox v-model="avoidAmbChar">{{text.get('avoidAmbChar')}}</b-checkbox>
            </div>
          </div>
        </b-collapse>
        <div id="generate-btn-div">
          <button
            class="button is-centered is-primary"
            type="button"
            :disabled="btnDisabled"
            @click="generate"
          >{{text.get('generate')}}</button>
        </div>
        <article class="message" v-show="passwordSuccess">
          <div class="message-body">
            <nav class="level column">
              <p id="password-text" class="level-item title" ref="passwordText">
                <strong>{{password}}</strong>
              </p>
            </nav>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import {
  mdiTranslate,
  mdiTag,
  mdiTextboxPassword,
  mdiEye,
  mdiEyeOff,
  mdiMenuDown,
  mdiMenuLeft,
} from '@mdi/js';
import Language from './Language';
import PasswordParams from './PasswordParams';
import GenerateUitl from './GenerateUitl';
import defaultLanguage from '../public/get-language';
import GithubCorner from './components/GithubCorner.vue';
import Icon from './components/Icon.vue';
@Component({
  components: {
    GithubCorner,
    Icon,
  },
})
export default class App extends Vue {
  private mdiTranslate: string = mdiTranslate;
  private mdiTag: string = mdiTag;
  private mdiTextboxPassword: string = mdiTextboxPassword;
  private iconEye: string = mdiEye;
  private mdiMenuDown: string = mdiMenuDown;
  private mdiMenuLeft: string = mdiMenuLeft;

  private isPasswordVisible: boolean = false;
  private passwordInputType: string = 'password';
  private lang: Language = new Language('en');
  private tag: string = '';
  private pwd: string = '';
  private version: number = 1;
  private length: number = 10;
  private hasSymbol: boolean = false;
  private hasNumber: boolean = true;
  private hasUpperCase: boolean = true;
  private hasLowerCase: boolean = true;
  private avoidAmbChar: boolean = false;
  private password: string = '';
  private btnDisabled: boolean = true;
  private passwordSuccess: boolean = false;
  private isModalActive: boolean = false;
  private languageSelect: string = 'en';
  private text: Map<string, string> = new Map();
  private params?: PasswordParams;

  created() {
    if (typeof defaultLanguage == 'string') {
      this.languageSelect = defaultLanguage;
    }
    this.changeString();
  }

  @Watch('languageSelect')
  languageChanged() {
    this.changeString();
    this.$forceUpdate();
  }

  private changeString() {
    this.lang.setLocale(this.languageSelect);
    localStorage.setItem('language', this.languageSelect);
    for (const key of this.lang.hans.keys()) {
      const value = this.lang.text.get(key);
      if (typeof value == 'string') {
        this.text.set(key, value);
      }
    }
  }

  private verify(): boolean {
    this.params = {
      tag: this.tag,
      pwd: this.pwd,
      version: this.version,
      length: this.length,
      hasSymbol: this.hasSymbol,
      hasNumber: this.hasNumber,
      hasUpperCase: this.hasUpperCase,
      hasLowerCase: this.hasLowerCase,
      avoidAmbChar: this.avoidAmbChar,
    };
    if (
      this.tag.length != 0 &&
      this.pwd.length != 0 &&
      GenerateUitl.getCharacterTypeNum(this.params) != 0
    ) {
      this.btnDisabled = false;
      return true;
    }
    this.btnDisabled = true;
    this.passwordSuccess = false;
    return false;
  }

  private generate() {
    if (this.verify()) {
      if (this.params != undefined) {
        this.password = GenerateUitl.generate(this.params);
        this.passwordSuccess = true;
      }
      this.$copyText(this.password).then(
        successEvent => {
          this.onCopySuccess();
        },
        errorEvent => {
          this.onCopyError();
        },
      );
    }
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
    const copySuccessText = this.text.get('copySuccess') as string;
    this.$buefy.toast.open({
      duration: 800,
      message: copySuccessText,
      position: 'is-bottom',
      type: 'is-success',
    });
  }

  private onCopyError() {
    App.selectText(this.$refs.passwordText as Element);
    const copyErrorText = this.text.get('copyError') as string;
    this.$buefy.toast.open({
      duration: 3000,
      message: 'copyErrorText',
      position: 'is-bottom',
      type: 'is-danger',
    });
  }

  private togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.passwordInputType = this.isPasswordVisible ? 'text' : 'password';
    this.iconEye = this.isPasswordVisible ? mdiEyeOff : mdiEye;
    this.$nextTick(() => {
      (this.$refs.inputPassword as HTMLInputElement).focus();
    });
  }
}
</script>
<style>
#language-btn {
  margin: 0.75rem;
}
.app-body {
  padding: 0.75rem;
}
#generate-btn-div {
  display: flex;
  justify-content: center;
  margin: 1rem;
}
#password-text {
  font-family: 'Fira Code', Menlo, Consolas, Monaco, 'Courier New', 'DejaVu Sans Mono';
}
#password-eye {
  pointer-events: visible;
}
</style>
