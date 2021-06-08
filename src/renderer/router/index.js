import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'landing-page',
      component: require('@/components/views/home/Home').default
    },
    {
      path: '/settings',
      name: 'Settings',
      component: require('@/components/views/settings/GameSettings').default
    },
    {
      path: '*',
      redirect: '/settings'
    }
  ]
})
