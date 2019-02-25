<template src="./Table.html"></template>

<script>
export default {
  data: () => ({
    dialog: false,
    search: '',
    headers: [
      { text: 'id', sortable: true, value: 'id' },
      { text: 'title', sortable: true, value: 'title' },
      { text: 'Name', sortable: false, value: 'first' },
      { text: 'Skill 1', sortable: true, value: 'skill_1' },
      { text: 'Rank 1', sortable: false, value: 'rank_1' },
      { text: 'Skill 2', sortable: true, value: 'rank_2' },
      { text: 'Rank 2', sortable: false, value: 'rank_2' },
      { text: 'Skill 3', sortable: true, value: 'rank_3' },
      { text: 'Rank 3', sortable: false, value: 'rank_3' },
      { text: 'City', sortable: true, value: 'city' },
      { text: 'Picture', sortable: true, value: 'picture' }
    ],
    devs: [],
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
    paginationSync: {
      descending: false,
      page: 10,
      rowsPerPage: 10, // -1 for All
      sortBy: "title",
      totalItems: 10
    },
    ranks: [5, 4, 3, 2, 1],
    skills: ['C', 'CPP', 'Go', 'JS', 'Java', 'Ruby'],
    title: ['Junior', 'Mid', 'Senior', 'Consultant', 'Architect'],
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
    console.log('%c this.$store.getters.getDevs = ' + this.$store.getters.getDevs, 'color: white')
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
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style scoped>

  .filters {
    transform: scale(0.8, 1);
    transform-origin: left;
  }

  .filters-row {
    background-color: grey;
  }
</style>
