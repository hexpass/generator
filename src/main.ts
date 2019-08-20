import Vue from 'vue';
import Buefy from 'buefy';
import App from './App.vue';
import './registerServiceWorker';
import '@mdi/font/css/materialdesignicons.css';
import 'buefy/dist/buefy.css';
import './assets/css/github-corner.css';

Vue.config.productionTip = false;

Vue.use(Buefy);

new Vue({
  render: h => h(App),
}).$mount('#app');
