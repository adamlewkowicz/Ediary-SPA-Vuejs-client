import Vue from 'vue';
import Router from 'vue-router';
import { store } from '@/store/store';

import Login from '@/pages/Login';

import Dashboard from '@/layouts/Dashboard';
import Homepage from '@/pages/Homepage';
import Diary from '@/pages/Diary';
import Training from '@/pages/Training';
import Profile from '@/pages/Profile';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        store.state.user.isLoggedIn ? next('/') : next();
      },
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        store.state.user.isLoggedIn ? next() : next('/login');
      },
      children: [
        {
          path: '',
          component: Homepage
        },
        {
          path: '/diary',
          component: Diary
        },
        {
          path: '/training',
          component: Training
        },
        {
          path: '/profile',
          component: Profile
        }
      ]
    }
  ]
})
