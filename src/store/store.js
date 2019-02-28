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
      state.devs = devs
    },
    SET_DBLCLICKED_ID(state, _id) {
      state.dblClickedId = _id
    }
  },
  actions: {
    getDevs(context, selectedSkills) {
      console.log('%c selectedSkills = ' + JSON.stringify(selectedSkills), 'color: white')
      ajaxGetDevs(context, selectedSkills)
    },
    setDdblClickedId(context, _id) {
      context.commit('SET_DBLCLICKED_ID', _id)
    }
  },
})
