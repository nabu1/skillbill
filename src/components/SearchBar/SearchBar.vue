<template src="./SearchBar.html"></template>

<script>
  import { sendEmail } from '../../services/ajax'
  import { LITERALS } from '../../services/constants.js'

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
        this.$store.dispatch('progressBar', true)
        this.$store.dispatch('findText', this.find)
      },

      onSelected() {
        console.log('%c selected = ' + JSON.stringify(this.$store.getters.getDblClickedDevs), 'color: yellow')
        this.$store.commit('READ_DEVS', this.$store.getters.getDblClickedDevs)
        //this.$store.dispatch('setSelectedDevs', [])
      },

      onResetSelected() {
        this.$store.dispatch('setDblClickedDevs', [])
        this.$store.dispatch('readDevs', {})
      },

      onEmail() {
        console.log('onEmail')
        const text = LITERALS.EMAIL_TEXT//const
        const devs = this.$store.getters.getDblClickedDevs
        console.log('%c devs = ' + devs, 'color: orange')

        const emails = devs.map(el => {
          return el.email
        })

        console.log('%c emails = ' + emails, 'color: orange')
        sendEmail(emails, text)
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

  a {
    color: primary;
    font-weight: 400;
    font-size: 1.1em;
    text-decoration: none;
  }
  body {
    color: white;
    font-variant: italic;
  }
  .stations {
    color: yellow;
  }
  .documents {
    color: lime;
  }

</style>
