import Vue from 'vue'
import Vuex from 'vuex'
// import _db from '@/plugins/db'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    is_mobile: ((window.cordova && window.cordova.platformId !== "browser") || window.innerWidth < 600),
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
