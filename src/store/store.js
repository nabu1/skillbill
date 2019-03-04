import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import { ajaxReadDevs, ajaxUpdateDev, ajaxDeleteDev, ajaxUpdateDates } from '../services/ajax'
Vue.use(Vuex)

function initialState() {
  return {
    devs: [],
    dblClickedDevs: null,
    selectedDevs: []
  }
}

export default new Vuex.Store({
  // plugins: [createPersistedState()],
  state: initialState,

  getters: {
    readDevs: state => state.devs,
    getDblClickedDevs: state => state.dblClickedDevs,
    //getSelectedDevs: state => state.selectedDevs
  },

  mutations: {
    READ_DEVS(state, devs) {
      state.selectedDevs = devs
      state.devs = devs
      // console.log('%c state.devs = ' + JSON.stringify(state.devs), 'color: lime')
    },

    SET_DBLCLICKED_DEVS(state, devs) {
      console.log('%c SET_DBLCLICKED_DEVS = ' + devs.length , 'color: lime')
      console.log('%c devs = ' + JSON.stringify(devs), 'color: lime')
      state.dblClickedDevs = devs
    },

    // SET_SELECTED_DEVS(state, selectedDevs) {
    //   console.log('%c SET_SELECTED_DEVS = ' + JSON.stringify(selectedDevs), 'color: white')
    //   state.selectedDevs = selectedDevs
    // }
  },

  actions: {
    readDevs(context, selectedSkills) {
      ajaxReadDevs(context, selectedSkills)
    },

    setDdblClickedDevs(context, devs) {
      context.commit('SET_DBLCLICKED_DEVS', devs)
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

    // setSelectedDevs(context, selectedDevs) {
    //   // console.log('%c setSelectedDevs = ' + JSON.stringify(selectedDevs), 'color: white')
    //   context.commit('SET_SELECTED_DEVS', selectedDevs)

    //}

  },
})
