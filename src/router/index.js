import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/layouts/Dashboard'
import Homepage from '@/pages/Homepage'
import Diary from '@/pages/Diary'
import Training from '@/pages/Training'
import Profile from '@/pages/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
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
