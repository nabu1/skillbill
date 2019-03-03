<template src="./Table.html"></template>

<script>
import { ajaxInsertDev, ajaxDeleteDev, ajaxUpdateDev, ajaxUpdateDates } from '../../services/ajax'
import { updateView } from '../../services/helpers'

export default {
  data: () => ({
    expand: false,
    selected: [],
    dialog: false,
    search: '',
    headers: [
      { text: '', sortable: false, value: '' },
      { text: 'id', sortable: true, value: 'id' },
      { text: 'title', sortable: true, value: 'title' },
      { text: 'First', sortable: false, value: 'first' },
      { text: 'Last', sortable: false, value: 'last' },
      { text: 'Skill 1', sortable: true, value: 'skill_1' },
      { text: 'Rank 1', sortable: false, value: 'rank_1' },
      { text: 'Skill 2', sortable: true, value: 'rank_2' },
      { text: 'Rank 2', sortable: false, value: 'rank_2' },
      { text: 'Skill 3', sortable: true, value: 'rank_3' },
      { text: 'Rank 3', sortable: false, value: 'rank_3' },
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
      rank_3: ''
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
      rank_3: ''
    },
    ranks: [5, 4, 3, 2, 1],
    skills: ['C', 'CPP', 'Go', 'JS', 'Java', 'ObjC', 'Ruby'],
    title: ['Junior', 'Mid', 'Senior', 'Consultant', 'Architect'],
    rowsPerPageItems: [10, 25, 100, 250, 1000, 1100, 2000, 2085, 3000],
    pagination: {
      rowsPerPage: 10
    },
    loading: false,
    newDevs: [],
    calendar: false,
    picker: [],
    devId: null,
    devFirst: null,
    devLast: null,
  }),

  computed: {
    devs () {
      //return this.$store.getters.getSelectedDevs || this.$store.getters.readDevs
      return this.$store.getters.readDevs
    },

    // selected() {
    //   console.log('computed: selected()')
    //   return this.$store.getters.getSelectedDevs
    // },

    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    /* dialog (val) {
      val || this.close()
    }, */
    /* calendar (val) {
      val || this.close()
    }  */
    selected() {
      console.log('%c this.selected = ' + this.selected.length, 'color: white')
      this.$store.dispatch('setSelectedDevs', this.selected)
    }
  },

  created () {
    this.$store.dispatch('readDevs')
  },

  methods: {
    onCheckbox() {
      console.log('onCheckbox')

    },

    onCalendar(dev) {

      this.devId = dev.id
      this.devFirst = dev.first
      this.devLast = dev.last
      this.picker = dev.dates || []
      this.calendar = true
      this.$store.dispatch('setDdblClickedDev', dev)
    },

    onCalendarSave (item) {
      const clickedDev = this.$store.getters.getDblClickedDev


      clickedDev.dates = this.picker
      this.$store.dispatch('updateCalendar', clickedDev)
      this.calendar = false
    },

    onCalendarClose () {
      this.picker = []
      this.calendar = false
    },

    onEditItem (item) {
      console.log('onEditItem')
      this.selected
      console.log('%c this.selected = ' + JSON.stringify(this.selected), 'color: white')

      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    onDeleteItem (item) {

      if (confirm('Na pewno chcesz usunąć ten rekord ?')) {

        this.$store.dispatch('deleteDev', item)
      }
    },

    onNewDevSave () {


      if (!this.editedItem.id) {

        this.$store.dispatch('insertDev', this.editedItem)
      }
      else {

        this.$store.dispatch('updateDev', this.editedItem)
      }

      this.dialog = false
    },

    onNewDevClose () {

      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    updatePagination(pagination) {
      this.$store.dispatch('readDevs', { paginationLimit: pagination.rowsPerPage })
    },

    onCheckbox(item) {

      this.selected = !this.selected
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
    color: #2196F3;
    margin: 0 0 10px 0
  }

  #app {
    margin-top: 0px !important;
    margin-bottom: 0px;
  }

</style>

