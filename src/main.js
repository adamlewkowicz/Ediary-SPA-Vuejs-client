// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import axios from 'axios';
import router from './router';
import { store } from './store/store';

// Vue.use(axios);

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksImVtYWlsIjoic29rcmF0MzNzIiwicGVybWlzc2lvbnMiOjAsInZlcmlmaWVkIjowLCJpYXQiOjE1MzAxMzU3MjgsImV4cCI6MTUzMDM5NDkyOH0.rdqrACJCdBjgZ1M1wUh2p5memL6D5375R8is1mPaUAQ`;

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('auth-token') || '';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  components: { App },
  template: '<App/>'
});
