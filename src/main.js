// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import axios from 'axios';
import router from './router';
import { store } from './store/store';


axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : 'https://ediary-api.tk/api/';
// axios.defaults.baseURL = 'https://ediary-api.tk/api/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth-token') || '';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  components: { App },
  template: '<App/>'
});
