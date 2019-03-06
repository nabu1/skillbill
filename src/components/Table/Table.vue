<template src="./Table.html"></template>

<script>
import { ajaxInsertDev, ajaxDeleteDev, ajaxUpdateDev, ajaxUpdateDates } from '../../services/ajax'
import { updateView } from '../../services/helpers'

export default {
  data: () => ({
    expand: false,
    selected: [],
    //dialog: false,

    headers: [
      { text: 'id', sortable: true, value: 'id' },
      { text: 'title', sortable: true, value: 'title' },
      { text: 'First', sortable: false, value: 'first' },
      { text: 'Last', sortable: false, value: 'last' },
      { text: 'Skill 1', sortable: false, value: 'skill_1' },
      { text: 'Rank 1', sortable: true, value: 'rank_1' },
      { text: 'Skill 2', sortable: false, value: 'skill_2' },
      { text: 'Rank 2', sortable: true, value: 'rank_2' },
      { text: 'Skill 3', sortable: false, value: 'skill_3' },
      { text: 'Rank 3', sortable: true, value: 'rank_3' },
      { text: 'Picture', sortable: false, value: 'picture' },
      { text: 'Tools', sortable: false, value: '' },
    ],
    editedIndex: -1,
    editedItem: {
      first: '',
      last: '',
      title: '',
      skill_1: '',
      rank_1: '',
      skill_2: '',
      rank_2: '',
      skill_3: '',
      rank_3: '',
    },
    defaultItem: {
      first: '',
      last: '',
      title: '',
      skill_1: '',
      rank_1: '',
      skill_2: '',
      rank_2: '',
      skill_3: '',
      rank_3: '',
    },
    ranks: [5, 4, 3, 2, 1],
    skills: ['C', 'CPP', 'Go', 'JS', 'Java', 'ObjC', 'Ruby'],
    title: ['Junior', 'Mid', 'Senior', 'Consultant', 'Architect'],
    rowsPerPageItems: [10, 25, 100, 250, 1000, 1100, 2000, 2085, 3000],
    pagination: {
      'sortBy': 'rank_1', 'descending': true, 'rowsPerPage': -1
    },
    newDevs: [],
    calendar: false,
    picker: [],
    devId: null,
    devFirst: null,
    devLast: null,
  }),

  computed: {
    devs() {
      //return this.$store.getters.getSelectedDevs || this.$store.getters.readDevs
      return this.$store.getters.readDevs
    },

    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },

    dialog() {
      return  this.$store.getters.getOpenDialog || false
    },

    progressBar() {
      return this.$store.getters.getProgressBar
    },

    // skills() {
    //   return this.$store.getters.getSkills
    // }
  },

  created() {
    this.$store.dispatch('readDevs')
  },

  methods: {
    onCalendar(dev) {
      console.log('onCalendar')

      this.devId = dev.id
      this.devFirst = dev.first
      this.devLast = dev.last
      this.picker = dev.dates || []
      this.calendar = true
      this.$store.dispatch('setCalendarDev', dev)
    },

    onCalendarSave(item) {
      console.log('onCalendarSave')
      const calendarDev = this.$store.getters.getCalendarDev

      calendarDev.dates = this.picker
      this.$store.dispatch('updateCalendar', calendarDev)
      this.$store.dispatch('progressBar', true)
      this.calendar = false
    },

    onCalendarClose() {
      this.picker = []
      this.calendar = false
    },

    onEdit(item) {
      console.log('onEdit')
      console.log('%c this.selected = ' + JSON.stringify(this.selected), 'color: white')

      this.editedItem = Object.assign({}, item)
      this.$store.dispatch('openDialog', true)
    },

    onDelete(item) {
      if (confirm('Na pewno chcesz usunąć ten rekord ?')) {
        this.$store.dispatch('deleteDev', item)
      }
    },

    onNewDevSave() {
      console.log('%c onNewDevSave', 'color: orange')
      console.log('%c this.editedItem = ' + JSON.stringify(this.editedItem), 'color: orange')

      if (!this.editedItem.id) {
        console.log('1')
        this.$store.dispatch('insertDev', this.editedItem)
      }
      else {
        console.log('2')
        this.$store.dispatch('updateDev', this.editedItem)
      }

      // this.dialog = false
      this.$store.dispatch('openDialog', false)
      this.$store.dispatch('progressBar', true)
    },

    onNewDevClose() {
      //this.dialog = false
      this.$store.dispatch('openDialog', false)
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    updatePagination(pagination) {
      console.log('%c updatePagination = ' + JSON.stringify(pagination), 'color: white')
      this.$store.dispatch('readDevs', { paginationLimit: pagination.rowsPerPage })
    },

    onDblClick(item) {
      console.log('item')
      this.selected.push(item)
      console.log('%c this.selected.length = ' + this.selected.length, 'color: lime')
      this.$store.dispatch('setDblClickedDevs', this.selected)
    }
  }
}
</script>

<style scoped>
.filters {
  transform: scale(1, 1);
  transform-origin: left;
}

.filters-row {
  background-color: grey;
}

#calendar_heading {
  color: #2196f3;
  margin: 0 0 10px 0;
}

#app {
  margin-top: 0px !important;
  margin-bottom: 0px;
}
</style>

