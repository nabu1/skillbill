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
      return this.$store.getters.readDevs
    },
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
  },

  created () {
    this.$store.dispatch('readDevs')
  },

  methods: {

    onCalendar(dev) {
      console.log('%c dev = ' + JSON.stringify(dev), 'color: white')
      this.devId = dev.id
      this.devFirst = dev.first
      this.devLast = dev.last
      this.picker = dev.dates || []
      this.calendar = true
      this.$store.dispatch('setDdblClickedDev', dev)
    },

    onCalendarSave (item) {
      console.log('%c item = ' + item, 'color: lime')
      console.log('%c this.$store.getters.getDblClickedDev = ' + this.$store.getters.getDblClickedDev, 'color: white')
      console.log(this.picker)

      this.calendar = false
      this.$store.dispatch('updateCalendar', { dev: this.$store.getters.getDblClickedDev, dates: this.picker })
    },

    onCalendarClose () {
      console.log('%c Tu onCalendarClose', 'color: lime')
      console.log('%c this.picker = ' + this.picker, 'color: white')
      this.picker = []
      this.calendar = false
    },

    onEditItem (item) {
      console.log('Tu editItem')
      console.log('%c this.selected = ' + JSON.stringify(this.selected), 'color: yellow')

      //console.log('%c this.$store.getters.readDevs = ' + this.$store.getters.readDevs.length, 'color: yellow')
      //console.log('%c editItem = ' + JSON.stringify(item), 'color: violet')
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    onDeleteItem (item) {

      if (confirm('Na pewno chcesz usunąć ten rekord ?')) {
        console.log('%c item = ' + JSON.stringify(item), 'color: yellow')
        this.$store.dispatch('deleteDev', item)
      }
    },

    onNewDevSave () {
      console.log('%c this.editedItem.id = ' + this.editedItem.id, 'color: lime')

      console.log('%c this.selected = ' + this.selected, 'color: orange')

      if (!this.editedItem.id) {
        console.log('%c Inserting Dev', 'color: lime')
        this.$store.dispatch('insertDev', this.editedItem)
      }
      else {
        console.log('%c Updating Dev', 'color: lime')
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

    updatePagination(pagination) {
      this.$store.dispatch('readDevs', { paginationLimit: pagination.rowsPerPage })
    },

    onCheckbox(item) {
      console.log('%c onCheckbox = ' + onCheckbox, 'color: lime')
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

