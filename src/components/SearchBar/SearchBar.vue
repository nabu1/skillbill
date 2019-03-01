<template src="./SearchBar.html"></template>

<script>
  export default {
    data() {
      return {
        search: ''
      }
    },
    methods: {
      onSelected() {
        console.log('%c selected = ' + JSON.stringify(this.selected), 'color: yellow')
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

     

    }
  }
</script>

<style scoped>
  #main {
    font-family: "Roboto";
  }
</style>
