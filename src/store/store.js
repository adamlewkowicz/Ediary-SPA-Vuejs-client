import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';

import diary from './diary';
import measurements from './measurements';


Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  state: {
    pickedDate: moment().format('YYYY-MM-DD')
  },
  modules: {
    diary,
    measurements
  }
});
