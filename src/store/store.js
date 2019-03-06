import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import { ajaxReadDevs, ajaxInsertDev, ajaxUpdateDev, ajaxDeleteDev,
  ajaxUpdateDates, ajaxFindText } from '../services/ajax'
import { dedupeSkills } from '../services/helpers'

  Vue.use(Vuex)

function initialState() {
  return {
    devs: [],
    dblClickedDevs: null,
    selectedDevs: [],
    openDialog: false,
    calendarDev: null,
    progressBar: false,
    skills: ['C', 'CPP', 'Go', 'JS', 'Java', 'ObjC', 'Ruby']
  }
}

export default new Vuex.Store({
  // plugins: [createPersistedState()],
  state: initialState,

  getters: {
    readDevs: state => state.devs,
    getDblClickedDevs: state => state.dblClickedDevs,
    getOpenDialog: state => state.openDialog,
    getCalendarDev: state => state.calendarDev,
    getProgressBar: state => state.progressBar,
    getSkills: state => state.skills
    //getSkills: state => ['C', 'CPP', 'Go', 'JS', 'Java', 'ObjC', 'Ruby']
  },

  mutations: {
    READ_DEVS(state, devs) {
      console.log('%c devs = ' + typeof devs, 'color: white')
      state.selectedDevs = devs
      state.devs = devs
      // console.log('%c state.devs = ' + JSON.stringify(state.devs), 'color: lime')
    },

    SET_DBLCLICKED_DEVS(state, devs) {
      console.log('%c SET_DBLCLICKED_DEVS = ' + devs.length , 'color: lime')
      console.log('%c devs.length = ' + devs.length, 'color: lime')
      state.dblClickedDevs = devs
    },

    OPEN_DIALOG(state, bool) {
      state.openDialog = bool
      console.log('%c OPEN_DIALOG = ' + bool, 'color: white')
    },

    SET_CALENDAR_DEV(state, dev) {
      console.log('%c SET_CALENDAR_DEV dev = ' + dev, 'color: yellow')
      state.calendarDev = dev
    },

    FIND_TEXT(state, text) {
      console.log('%c FIND_TEXT = ' + text, 'color: yellow')
      state.text = text
    },

    PROGRESS_BAR(state, bool) {
      console.log('%c PROGRESS_BAR = ', 'color: yellow')
      state.progressBar = bool
    },

    SKILLS(state, filteredSkills) {
      console.log('%c SKILLS = ' + filteredSkills, 'color: white')
      //state.skills = filteredSkills
      state.skills =  ['Javascript', 'Java']
    }
  },

  actions: {
    readDevs(context, selectedSkills) {
      ajaxReadDevs(context, selectedSkills)
    },

    setDblClickedDevs(context, devs) {
      context.commit('SET_DBLCLICKED_DEVS', devs)
    },

    deleteDev(context, dev) {
      ajaxDeleteDev(context, dev)
    },

    insertDev(context, dev) {
      console.log('%c insertDev dev = ' + JSON.stringify(dev), 'color: yellow')
      ajaxInsertDev(dev)
    },

    updateDev(context, dev) {
      ajaxUpdateDev(context, dev)
    },

    updateCalendar(context, calendarDev) {
      console.log('%c updateCalendar calendarDev = ' + calendarDev, 'color: white')
      ajaxUpdateDates(context, calendarDev)
    },

    openDialog(context, bool) {
      context.commit('OPEN_DIALOG', bool)

    },

    setCalendarDev(context, dev) {
      console.log('%c setCalendarDev dev = ' + dev, 'color: yellow')
      context.commit('SET_CALENDAR_DEV', dev)
    },

    findText(context, text) {
      console.log('%c findText = ' + text, 'color: yellow')
      ajaxFindText(context, text)
    },

    progressBar(context, bool) {
      console.log('%c progressBar = ' + bool, 'color: white')
      context.commit('PROGRESS_BAR', bool)
    },

    skills(context, skill) {
      console.log('%c skills = ' + skill, 'color: lime')
      //context.commit('SKILLS', skills)
      dedupeSkills(context, skill)
    }
  }
})
