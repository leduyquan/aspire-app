import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import VeeValidate from 'vee-validate';
import { i18n } from './i18n';
// import { router } from './routes';
// import { store } from './store';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(VeeValidate, { inject: false });



new Vue({
  i18n,
  // router,
  // store,
  render: h => h(App),
}).$mount('#app')
