import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import { ajaxReadDevs, ajaxUpdateDev, ajaxDeleteDev, ajaxUpdateDates } from '../services/ajax'
Vue.use(Vuex)

function initialState() {
  return {
    devs: [],
    dblClickedDev: null,
    selectedDevs: []
  }
}

export default new Vuex.Store({
  // plugins: [createPersistedState()],
  state: initialState,

  getters: {
    readDevs: state => state.devs,
    getDblClickedDev: state => state.dblClickedDev,
    getSelectedDevs: state => state.selectedDevs
  },

  mutations: {
    READ_DEVS(state, devs) {
      state.devs = devs
      console.log('%c state.devs = ' + state.devs.length, 'color: lime')
      state.selectedDevs = []
    },

    SET_DBLCLICKED_DEV(state, dev) {
      state.dblClickedDev = dev
    },

    SET_SELECTED_DEVS(state, selectedDevs) {
      // console.log('%c SET_SELECTED_DEVS = ' + JSON.stringify(selectedDevs), 'color: white')
      state.selectedDevs = selectedDevs
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
      ajaxDeleteDev(context, dev)
    },

    insertDev(context, dev) {
      ajaxInsertDev(context, dev)
    },

    updateDev(context, dev) {
      ajaxUpdateDev(context, dev)
    },

    updateCalendar(context, clickedDev) {
      ajaxUpdateDates(context, clickedDev)
    },

    setSelectedDevs(context, selectedDevs) {
      // console.log('%c setSelectedDevs = ' + JSON.stringify(selectedDevs), 'color: white')
      context.commit('SET_SELECTED_DEVS', selectedDevs)

    }

  },
})
