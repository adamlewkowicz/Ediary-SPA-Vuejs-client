import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';

import date from './date';
import diary from './diary';
import measurements from './measurements';
import training from './training';


Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  modules: {
    date,
    diary,
    measurements,
    training
  }
});
