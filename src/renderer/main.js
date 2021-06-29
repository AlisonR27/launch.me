import Vue from 'vue'
import axios from 'axios'
import db from '../service/database/datastore'
import Vuex from 'vuex'

import App from './App'
import router from './router'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$db = db
Vue.use(Vuex)
// Vuex
const store = new Vuex.Store({
  state: {
    isGameModalOpened: false,
    currentGame: {}
  },
  mutations: {
    updateCurrentGame (state, game) {
      state.currentGame = game
    },
    toggleGameModal (state) {
      state.isGameModalOpened = !(state.isGameModalOpened)
    }
  },
  actions: {
    openGameModal (context, game) {
      context.commit('updateCurrentGame', game)
      context.commit('toggleGameModal')
    }
  }
})

Vue.use(store)
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>',
  store
}).$mount('#app')
