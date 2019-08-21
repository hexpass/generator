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
            <b-checkbox native-value="lowerCase" v-model="characters">a-z</b-checkbox>
          </b-field>
          <b-field>
            <b-checkbox native-value="upperCase" v-model="characters">A-Z</b-checkbox>
          </b-field>
          <b-field>
            <b-checkbox native-value="number" v-model="characters">0-9</b-checkbox>
          </b-field>
          <b-field>
            <b-checkbox native-value="symbol" v-model="characters">!@#$%^*&amp;</b-checkbox>
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
    this.password = md5('123');
    this.passwordSuccess = true;
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
