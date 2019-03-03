import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import { ajaxReadDevs, ajaxUpdateDev, ajaxDeleteDev, ajaxUpdateDates } from '../services/ajax'
Vue.use(Vuex)

function initialState() {
  return {
    devs: [],
    dblClickedDev: null
  }
}

export default new Vuex.Store({
  // plugins: [createPersistedState()],
  state: initialState,

  getters: {
    readDevs: state => state.devs,
    getDblClickedDev: state => state.dblClickedDev
  },

  mutations: {
    READ_DEVS(state, devs) {
      setTimeout(() => {
        state.devs = devs
        console.log('%c Tu READ_DEVS, devs[i] = ' + JSON.stringify(state.devs[0]), 'color: yellow')
      }, 1000)

    },

    SET_DBLCLICKED_DEV(state, dev) {
      state.dblClickedDev = dev
    }
  },

  actions: {
    readDevs(context, selectedSkills) {
      ajaxReadDevs(context, selectedSkills)
    },

    setDdblClickedDev(context, dev) {
      context.commit('SET_DBLCLICKED_DEV', dev)
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

    updateCalendar(context, clickedDev) {
      ajaxUpdateDates(context, clickedDev)
    },

  },
})
