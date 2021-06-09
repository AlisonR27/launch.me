import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'landing-page',
      component: require('@/components/views/main/Launchme').default,
      children: [
        {
          name: 'Home',
          path:'/home',
          component: require('@/components/views/main/routes/home/Home')
        }
      ]
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
