import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import { ajaxReadDevs, ajaxUpdateDev, ajaxDeleteDev } from '../services/ajax'
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
    readDevs: state => state.devs,
    getDblClickedId: state => state.dblClickedId
  },

  mutations: {
    READ_DEVS(state, devs) {
      console.log('%c Tu READ_DEVS, devs = ' + devs.length, 'color: yellow')
      state.devs = devs
    },

    SET_DBLCLICKED_ID(state, _id) {
      state.dblClickedId = _id
    }
  },

  actions: {
    readDevs(context, selectedSkills) {
      ajaxReadDevs(context, selectedSkills)
    },

    setDdblClickedId(context, _id) {
      context.commit('SET_DBLCLICKED_ID', _id)
    },

    deleteDev(context, dev) {
      console.log('%c Tu deleteDev  dev = ' + JSON.stringify(dev), 'color: yellow')
      ajaxDeleteDev(context, dev)
    },

    insertDev(context, dev) {
      console.log('%c dev = ' + JSON.stringify(dev), 'color: white')
      ajaxInsertDev(context, dev)
    },

    updateDev(context, dev) {
      console.log('%c dev = ' + JSON.stringify(dev), 'color: white')
      ajaxUpdateDev(context, dev)
    },


  },
})
