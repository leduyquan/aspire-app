import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from '@/App';
import VeeValidate from 'vee-validate';
import VueCarousel from 'vue-carousel';
import i18n from '@/i18n';
import router from '@/routes';
import './mixins/mixin'
// import { store } from './store';
import 'ant-design-vue/dist/antd.css';
// require('@/assets/scss/styles.css')
Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(VueCarousel);
Vue.use(VeeValidate, { inject: false });

Vue.component('app-button', require('./components/global/AppButton.vue').default);
Vue.component('app-input', require('./components/global/AppInput.vue').default);


new Vue({
  i18n,
  router,
  // store,
  render: h => h(App),
}).$mount('#app')
