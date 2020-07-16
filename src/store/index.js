import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: window.localStorage.getItem('login' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('login' || '[]')).username
   }
   },
  mutations: {
    login (state, user) {
      state.user = user
      window.localStorage.setItem('login', JSON.stringify(user))
    }
  },
  actions: {
  },
  modules: {
  }
})
