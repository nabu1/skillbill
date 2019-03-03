<template src="./SearchBar.html"></template>

<script>
  export default {
    data() {
      return {
        search: '',
        // selected: []
      }
    },
    methods: {
      onSelected() {
        console.log('%c selected = ' + JSON.stringify(this.$store.getters.getSelectedDevs), 'color: yellow')
        this.$store.commit('READ_DEVS', this.$store.getters.getSelectedDevs)
      },
      onResetSelected() {
        //this.selected = []
        this.$store.dispatch('setSelectedDevs', [])
        this.$store.dispatch('readDevs', {})

      },
      onEmail() {
        console.log('onEmail')
      },

      onNewDev(item) {
      },
    }
  }
</script>

<style scoped>
  #main {
    font-family: "Roboto";
  }
</style>
