<template src="./SearchBar.html"></template>

<script>
  export default {
    data() {
      return {
        search: '',
        dblClickedDevs: ''
      }
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
      },
    }
  }
</script>

<style scoped>
  #main {
    font-family: "Roboto";
  }
</style>
