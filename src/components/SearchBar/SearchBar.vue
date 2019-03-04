<template src="./SearchBar.html"></template>

<script>
  export default {
    data() {
      return {
        search: '',
        //dblClickedDevs: ''
      }
    },
    computed: {
      dblClickedDevs() {
        console.log('Tu dblClickedDevs')
        // console.log('%c this.selected = ' + this.selected.length, 'color: white')
        return this.$store.getters.getdblClickedDevs ? this.$store.getters.getdblClickedDevs.length : 0

      },
    },
    methods: {
      onSelected() {
        console.log('%c selected = ' + JSON.stringify(this.$store.getters.getDblClickedDevs), 'color: yellow')
        this.$store.commit('READ_DEVS', this.$store.getters.getDblClickedDevs)
        //this.$store.dispatch('setSelectedDevs', [])
      },

      onResetSelected() {
        //this.selected = []
        this.$store.dispatch('setDdblClickedDevs', [])
        this.$store.dispatch('readDevs', {})
        //this.$store.commit('READ_DEVS', [])
      },

      onEmail() {
        console.log('onEmail')
      },

      onNewDev(item) {
        console.log('Tu onNewDev')
        this.$store.dispatch('openDialog', true)
      },
    }
  }
</script>

<style scoped>
  #main {
    font-family: "Roboto";
  }
</style>
