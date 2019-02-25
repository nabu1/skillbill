<template src="./Table.html"></template>

<script>
const selectedSkills = {}

export default {
  data: () => ({
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
      { text: 'Picture', sortable: true, value: 'picture' }
    ],
    //devs: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      title: 0,
      skill_1: 0,
      rank_1: 0,
      skill_2: 0,
      rank_2: 0,
      skill_3: 0,
      rank_3: 0
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
  }),

  computed: {
    devs () {
      return this.$store.getters.getDevs
    },
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      //return {}
    }
  },

  watch: {
    dialog (val) {
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
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
    },

    close () {
      console.log('%c Tu close', 'color: red')

      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      console.log('%c Tu save', 'color: red')

      if (this.editedIndex > -1) {
        Object.assign(this.divs[this.editedIndex], this.editedItem)
      }
      else {
        this.divs.push(this.editedItem)
      }
      this.close()
    },

    onTitle(e) {
      console.log('%c onTitle = ' + e, 'color: yellow')
      selectedSkills.title = e
    },

    onSkill_1(e) {
      console.log('%c onSkill_1 = ' + e, 'color: yellow')
      selectedSkills.skill_1 = e
    },

    onRank_1(e) {
      console.log('%c onRank_1 = ' + e, 'color: yellow')
      selectedSkills.rank_1 = e

      console.log('%c selectedSkills = ' + JSON.stringify(selectedSkills), 'color: white')
    },

    onSkill_2(e) {
      console.log('%c onSkill_2 = ' + e, 'color: yellow')
      selectedSkills.skill_2 = e
    },

    onRank_2(e) {
      console.log('%c onRank_2 = ' + e, 'color: yellow')
      selectedSkills.rank_2 = e
    },

    onSkill_3(e) {
      console.log('%c onSkill_3 = ' + e, 'color: yellow')
      selectedSkills.skill_3 = e
    },

    onRank_3(e) {
      console.log('%c onRank_3 = ' + e, 'color: yellow')
      selectedSkills.rank_3 = e
    },

    onSearch() {
      console.log('%c onSearch ', 'color: lime')
      this.$store.dispatch('getDevs', selectedSkills)
    },

    onClear() {
      console.log('%c onClear ', 'color: lime')
      selectedSkills = {}
    },

    onSelected() {
      console.log('%c selected = ' + JSON.stringify(this.selected), 'color: yellow')
      this.$store.commit('GET_DEVS', this.selected)
    },

    onResetSelected() {
      console.log('%c onResetSelected', 'color: lime')
      this.selected = []
      this.$store.commit('GET_DEVS', this.selected)

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
</style>
