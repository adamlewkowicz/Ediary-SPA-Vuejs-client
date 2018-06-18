import Vue from 'vue';
import Vuex from 'vuex';

import diary from './diary';

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  modules: {
    diary
  }
});
