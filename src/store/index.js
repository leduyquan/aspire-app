import Vue from 'vue'
import Vuex from 'vuex'
import { card } from './card';

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    card,
  }
});