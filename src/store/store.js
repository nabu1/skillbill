import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { ajaxGetDevs } from '../services/ajax'

Vue.use(Vuex)

function initialState() {
  return {
    devs: []
  }
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: initialState,
  getters: {
    getDevs: state => state.devs
  },
  mutations: {
    GET_DEVS(state, devs) {
      //console.log('%c devs = ' + devs.length, 'color: violet')
      //console.log(devs)
      state.devs = devs
    },
  },
  actions: {
    getDevs(context, selectedSkills) {
      console.log('%c actions: selectedSkills = ' + selectedSkills, 'color: white')
      ajaxGetDevs(context, selectedSkills)
    },

  },
})
