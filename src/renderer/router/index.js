import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/#/main',
      name: 'Land',
      component: require('@/components/views/main/Main').default,
      children: [
        {
          name: 'Home',
          path: '/#/home',
          component: require('@/components/views/main/routes/home/Home').default
        },
        {
          name: 'Games',
          path: '/#/games',
          component: require('@/components/views/main/routes/games/Games').default
        }
      ]
    },
    {
      path: '/#/settings',
      name: 'Settings',
      component: require('@/components/views/settings/GameSettings').default
    },
    {
      path: '/',
      redirect: '/#/main'
    }
  ]
})
