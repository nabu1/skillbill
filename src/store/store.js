import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

import { ajaxGetDevs } from '../services/ajax'

Vue.use(Vuex)

function initialState() {
  return {
    devs: [],
    dblClickedId: null
  }
}

export default new Vuex.Store({
  // plugins: [createPersistedState()],
  state: initialState,
  getters: {
    getDevs: state => state.devs,
    getDblClickedId: state => state.dblClickedId
  },
  mutations: {
    GET_DEVS(state, devs) {
      // console.log('%c devs = ' + devs.length, 'color: violet')
      state.devs = devs
    },
    SET_DBLCLICKED_ID(state, _id) {
      // console.log('%c SET_DBLCLICKED_ID _id = ' + _id, 'color: white')
      state.dblClickedId = _id
    }
  },
  actions: {
    getDevs(context, selectedSkills) {
      ajaxGetDevs(context, selectedSkills)
    },
    setDdblClickedId(context, _id) {
      // console.log('%c setDdblClickedId _id = ' + _id, 'color: white')
      context.commit('SET_DBLCLICKED_ID', _id)
    }
  },
})
