import Vue from 'vue';
import Buefy from 'buefy';
import VueClipboard from 'vue-clipboard2';
import App from './App.vue';
import './registerServiceWorker';
import '@mdi/font/css/materialdesignicons.css';
import 'buefy/dist/buefy.css';

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(VueClipboard);

new Vue({
  render: h => h(App),
}).$mount('#app');
