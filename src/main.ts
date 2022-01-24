import Vue from 'vue';
import Buefy from 'buefy';
import VueClipboard from 'vue-clipboard2';
import App from './App.vue';
import './registerServiceWorker';
import './style/custom_bulma.scss';

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(VueClipboard);

new Vue({
  render: h => h(App),
}).$mount('#app');
