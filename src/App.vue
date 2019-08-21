<template>
  <div class="app">
    <GithubCorner url="https://github.com/Petrichor/HexPass" />
    <div class="column is-4 is-offset-4">
      <b-field label="标签">
        <b-input v-model="tag" />
      </b-field>
      <b-field label="密码">
        <b-input type="password" v-model="pwd" password-reveal />
      </b-field>
      <b-collapse :open="false" class="card" aria-id="advanced">
        <template #trigger="triggerStatus">
          <div class="card-header" role="button" aria-controls="advanced">
            <p class="card-header-title">高级</p>
            <a class="card-header-icon">
              <b-icon :icon="triggerStatus.open ? 'menu-down' : 'menu-left'" />
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
            <b-checkbox native-value="lowerCase" :value="true" v-model="characters">a-z</b-checkbox>
          </b-field>
          <b-field>
            <b-checkbox native-value="upperCase" :value="true" v-model="characters">A-Z</b-checkbox>
          </b-field>
          <b-field>
            <b-checkbox native-value="number" :value="true" v-model="characters">0-9</b-checkbox>
          </b-field>
          <b-field>
            <b-checkbox native-value="symbol" v-model="characters">!@#$%^*&amp;</b-checkbox>
          </b-field>
        </div>
      </b-collapse>
      <div class="generate-btn">
        <b-button type="is-success" class="is-centered" outlined @click="generate">生成</b-button>
      </div>
      <b-message>
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
  public tag: string = '';
  public pwd: string = '';
  public length: number = 10;
  public characters: string[] = [];
  public password: string = '';

  public generate() {
    this.password = md5('123');
    this.$buefy.toast.open({
      duration: 1000,
      message: '已经复制到剪切板',
      position: 'is-bottom',
      type: 'is-success',
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
