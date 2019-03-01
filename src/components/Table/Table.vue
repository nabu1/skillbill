<template src="./Table.html"></template>

<script>
import { ajaxInsertDev, ajaxDeleteDev, ajaxUpdateDev } from '../../services/ajax'
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
      //{ text: 'City', sortable: true, value: 'city' },
      //{ text: 'Picture', sortable: false, value: 'picture' }
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
      return this.$store.getters.readDevs
    },
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    calendar (val) {
      val || this.close()
    }
  },

  created () {
    this.$store.dispatch('readDevs')
  },

  methods: {
    onTitle(e) {
      // console.log('%c onTitle = ' + e, 'color: yellow')
      this.selectedSkills.title = e
    },

    onSelected() {
      // console.log('%c selected = ' + JSON.stringify(this.selected), 'color: yellow')
      this.$store.commit('READ_DEVS', this.selected)
    },
    onResetSelected() {
      // console.log('%c onResetSelected', 'color: lime')
      this.selected = []
      this.$store.commit('READ_DEVS', this.selected)

    },
    onEmail() {
      console.log('onEmail')
    },

    onNewDev(item) {
      // console.log('%c onNewDev', 'color: lime')
    },

    onNewDevSave () {
      //console.log('%c Tu save', 'color: lime')
      // console.log('%c this.editedIndex = ' + this.editedIndex, 'color: yellow')
      // console.log('%c this.editedItem = ' + JSON.stringify(this.editedItem), 'color: yellow')
      // console.log('%c this.editedItem.id = ' + this.editedItem.id, 'color: yellow')

      //const devs = this.$store.getters.readDevs
      //console.log('%c devs.length = ' + devs.length, 'color: violet')

      if (!this.editedItem.id) {
        console.log('%c Inserting Dev', 'color: lime')
        this.$store.dispatch('insertDev', this.editedItem)
        //ajaxInsertDev(this.editedItem)
      }
      else {
        console.log('%c Updating Dev', 'color: lime')
        // ajaxUpdateDev(this.editedItem)
        this.$store.dispatch('updateDev', this.editedItem)
      }

      this.dialog = false
    },

    onNewDevClose () {
      console.log('%c Tu close', 'color: lime')
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    calendarAllowedDates: val => parseInt(val.split('-')[2], 10) % 1 === 0,

    onCalendar(e) {
      console.log('%c onCalendar: dates =' + e.dates, 'color: white')

      this.devId = e.id
      this.devFirst = e.first
      this.devLast = e.last
      this.$store.dispatch('setDdblClickedId', e._id.$oid)
      // this.$store.dispatch('setDdblClickedId', e.id)
      //this.picker = [ "2019-02-21" , "2019-02-23" , "2019-02-22"]
      this.picker = e.dates || []
      this.calendar = true
    },

    onCalendarSave (item) {
      console.log('%c this.$store.getters.getDblClickedId = ' + this.$store.getters.getDblClickedId, 'color: white')
      console.log(this.picker)

      this.calendar = false
      ajaxUpdateDates(this.$store.getters.getDblClickedId, this.picker)
    },

    onCalendarClose () {
      console.log('%c Tu onCalendarClose', 'color: lime')
      console.log('%c this.picker = ' + this.picker, 'color: white')
      this.picker = []
      this.calendar = false
    },

    onEditItem (item) {
      console.log('Tu editItem')
      //console.log('%c this.$store.getters.readDevs = ' + this.$store.getters.readDevs.length, 'color: yellow')
      //console.log('%c editItem = ' + JSON.stringify(item), 'color: violet')
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    onDeleteItem (item) {
      console.log('deleteItem')

      if (confirm('Na pewno chcesz usunąć ten rekord ?')) {
        //ajaxDeleteDev(JSON.stringify(item._id.$oid))
        ajaxDeleteDev(item)
        //updateView(this.$store.getters.readDevs, item)
      }
    },

    updatePagination(pagination) {
      this.$store.dispatch('readDevs', { paginationLimit: pagination.rowsPerPage })
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

