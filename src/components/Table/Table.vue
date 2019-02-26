<template src="./Table.html"></template>

<script>

export default {
  data: () => ({
    expand: false,
    selected: [],
    selectedSkills: {},
    skill_1: '',
    rank_1: '',
    skill_2: '',
    rank_2: '',
    skill_3: '',
    rank_3: '',
    dialog: false,
    calendar: false,
    search: '',
    headers: [
      { text: '', sortable: false, value: '' },
      { text: 'id', sortable: true, value: 'id' },
      { text: 'title', sortable: true, value: 'title' },
      { text: 'First', sortable: false, value: 'first' },
      { text: 'Last', sortable: false, value: 'last' },
      { text: 'Skill 1', sortable: false, value: 'skill_1' },
      { text: 'Rank 1', sortable: true, value: 'rank_1' },
      { text: 'Skill 2', sortable: false, value: 'rank_2' },
      { text: 'Rank 2', sortable: true, value: 'rank_2' },
      { text: 'Skill 3', sortable: false, value: 'rank_3' },
      { text: 'Rank 3', sortable: true, value: 'rank_3' },
      //{ text: 'City', sortable: true, value: 'city' },
      { text: 'Picture', sortable: true, value: 'picture' }
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
      name: '',
      title: 0,
      skill_1: 0,
      rank_1: 0,
      skill_2: 0,
      rank_2: 0,
      skill_3: 0,
      rank_3: 0
    },
    ranks: [5, 4, 3, 2, 1],
    skills: ['C', 'CPP', 'Go', 'JS', 'Java', 'ObjC', 'Ruby'],
    title: ['Junior', 'Mid', 'Senior', 'Consultant', 'Architect'],
    rowsPerPageItems: [10, 25, 100, 1000],
    pagination: {
      rowsPerPage: 10
    },
    loading: false,
    newDevs: []
  }),

  computed: {
    devs () {
      return this.$store.getters.getDevs
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
    this.initialize()
    this.devs = this.$store.getters.getDevs
  },

  methods: {
    initialize () {
      this.$store.dispatch('getDevs')
      //this.$store.dispatch('setLoading', true)
    },

    editItem (item) {
      console.log('%c editItem = ' + item, 'color: violet')

      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      console.log('%c deleteItem = ' + item, 'color: violet')

      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
    },

    onTitle(e) {
      // console.log('%c onTitle = ' + e, 'color: yellow')
      this.selectedSkills.title = e
    },

    onSkill_1(e) {
      // console.log('%c onSkill_1 = ' + e, 'color: yellow')
      this.selectedSkills.skill_1 = e
    },

    onRank_1(e) {
      // console.log('%c onRank_1 = ' + e, 'color: yellow')
      this.selectedSkills.rank_1 = e

      this.console.log('%c selectedSkills = ' + JSON.stringify(selectedSkills), 'color: white')
    },

    onSkill_2(e) {
      // console.log('%c onSkill_2 = ' + e, 'color: yellow')
      this.selectedSkills.skill_2 = e
    },

    onRank_2(e) {
      // console.log('%c onRank_2 = ' + e, 'color: yellow')
      this.selectedSkills.rank_2 = e
    },

    onSkill_3(e) {
      // console.log('%c onSkill_3 = ' + e, 'color: yellow')
      this.selectedSkills.skill_3 = e
    },

    onRank_3(e) {
      // console.log('%c onRank_3 = ' + e, 'color: yellow')
      this.selectedSkills.rank_3 = e
    },

    onSearch() {
      // console.log('%c onSearch ', 'color: lime')
      // console.log('%c this.selectedSkills = ' + JSON.stringify(this.selectedSkills), 'color: orange')
      this.$store.dispatch('getDevs', this.selectedSkills)
    },

    onClear() {
      // console.log('%c this.skill_1 = ' + this.skill_1, 'color: lime')
      // console.log('%c this.selectedSkills = ' + JSON.stringify(this.selectedSkills), 'color: lime')
      this.selectedSkills = {}
      this.skill_1 = null
      this.skill_2 = null
      this.skill_3 = null
      this.rank_1 = null
      this.rank_2 = null
      this.rank_3 = null
    },

    onSelected() {
      // console.log('%c selected = ' + JSON.stringify(this.selected), 'color: yellow')
      this.$store.commit('GET_DEVS', this.selected)
    },

    onResetSelected() {
      // console.log('%c onResetSelected', 'color: lime')
      this.selected = []
      this.$store.commit('GET_DEVS', this.selected)

    },
    onNewDev() {
      console.log('%c onNewDev = ' + onNewDev, 'color: lime')
    },

    onClose () {
      console.log('%c Tu close', 'color: lime')
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    onSave () {
      console.log('%c Tu save', 'color: lime')
      console.log('%c this.editedIndex = ' + this.editedIndex, 'color: yellow')
      console.log('%c this.editedItem = ' + JSON.stringify(this.editedItem), 'color: yellow')

      if (this.editedIndex > -1) {
        Object.assign(this.devs[this.editedIndex], this.editedItem)
      }
      else {
        this.newDevs.push(this.editedItem)
      }

      console.log('%c this.newDevs = ' + JSON.stringify(this.newDevs), 'color: yellow')

      // todo zapis rekordu na mLabie

      this.close()
    },

    onEmail() {
      console.log('onEmail')
    },

    onTableRow(e) {
      console.log('%c onTableRow', 'color: white')
      this.calendar = true
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

  .theme--dark.v-table thead th {
    color: black;
  }

</style>
