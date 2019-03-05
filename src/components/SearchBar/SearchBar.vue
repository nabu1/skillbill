<template src="./SearchBar.html"></template>

<script>

  export default {
    data() {
      return {
        find: '',
      }
    },
    computed: {
      dblClickedDevs() {
        if (this.$store.getters.getDblClickedDevs) {
          return this.$store.getters.getDblClickedDevs.length
        }
      }
    },
    methods: {
      onFind() {
        console.log('%c onFind = ' + this.find, 'color: orange')
        this.$store.dispatch('findText', this.find)
      },

      onSelected() {
        console.log('%c selected = ' + JSON.stringify(this.$store.getters.getDblClickedDevs), 'color: yellow')
        this.$store.commit('READ_DEVS', this.$store.getters.getDblClickedDevs)
        //this.$store.dispatch('setSelectedDevs', [])
      },

      onResetSelected() {
        //this.selected = []
        this.$store.dispatch('setDblClickedDevs', [])
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
