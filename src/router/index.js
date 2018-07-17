import Vue from 'vue';
import Router from 'vue-router';
import { store } from '@/store/store';

import Login from '@/pages/Login';

import Dashboard from '@/layouts/Dashboard';
import Homepage from '@/pages/Homepage';
import Training from '@/pages/Training';
import Profile from '@/pages/Profile';

import Diary from '@/pages/Diary';
import Home from '@/pages/Diary/Home';
import Stats from '@/pages/Diary/Stats';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login,
      beforeEnter: (to, from, next) => {
        store.state.user.isLoggedIn ? next('/') : next();
      },
    },
    {
      path: '/',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        store.state.user.isLoggedIn ? next() : next('/login');
      },
      children: [
        {
          path: '',
          component: Homepage,
          meta: { title: 'Panel główny' }
        },
        {
          path: '/diary',
          component: Diary,
          meta: { title: 'Dziennik żywieniowy' },
          children: [
            {
              path: '',
              component: Home,
              meta: { title: 'Posiłki' }
            },
            {
              path: 'stats',
              component: Stats,
              meta: { title: 'Statystyki' }
            }
          ]
        },
        {
          path: '/training',
          component: Training,
          meta: { title: 'Treningi' }
        },
        {
          path: '/profile',
          component: Profile,
          meta: { title: 'Profil' }
        }
      ]
    }
  ]
})
