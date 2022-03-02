import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './en.json';
Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'en-US',
  fallbackLocale: 'en',
  silentTranslationWarn: true,
  messages: {
    en
  },
});