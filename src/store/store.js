import Vue from 'vue'
import Vuex from 'vuex'
//! import createPersistedState from 'vuex-persistedstate'
import { ajaxReadDevs, ajaxUpdateDev, ajaxDeleteDev, ajaxUpdateDates } from '../services/ajax'
Vue.use(Vuex)

function initialState() {
  return {
    devs: [],
    dblClickedDev: null
  }
}

export default new Vuex.Store({
  //! plugins: [createPersistedState()],
  state: initialState,

  getters: {
    readDevs: state => state.devs,
    getDblClickedDev: state => state.dblClickedDev
  },

  mutations: {
    READ_DEVS(state, devs) {
      state.devs = devs

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

      ajaxDeleteDev(context, dev)
    },

    insertDev(context, dev) {

      ajaxInsertDev(context, dev)
    },

    updateDev(context, dev) {

      ajaxUpdateDev(context, dev)
    },

    updateCalendar(context, dev) {
      ajaxUpdateDates(context, dev)
    },

  },
})
