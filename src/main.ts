import Vue from 'vue';
import App from './App.vue';
import '~/assets/styles/main.scss';
import { store } from '~/store/index'; // eslint-disable-line

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store: store,
}).$mount('#app');
