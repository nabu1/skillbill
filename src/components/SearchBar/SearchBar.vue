<template src="./SearchBar.html"></template>

<script>
  import { sendEmail } from '../../services/ajax'
  import { LITERALS } from '../../services/constants.js'

  export default {
    data() {
      return {
        find: '',
        emailDisabled: true
      }
    },

    computed: {
      dblClickedDevs() {
        if (this.$store.getters.getDblClickedDevs) {
          return this.$store.getters.getDblClickedDevs.length
        }
      },
    },

    methods: {
      onFind() {
        console.log('%c this.find.length = ' + this.find.length, 'color: orange')

        if (this.find.length < 3) {
          return alert('Szukane słowo musi mieć conajmniej 3 znaki')
        }

        this.$store.dispatch('progressBar', true)
        this.$store.dispatch('findText', this.find)
      },

      onSelected() {
        this.$store.commit('READ_DEVS', this.$store.getters.getDblClickedDevs)

        this.emailDisabled = false
      },

      onResetSelected() {
        this.$store.dispatch('setDblClickedDevs', [])
        this.$store.dispatch('readDevs', {})
        this.$store.dispatch('progressBar', true)
        this.emailDisabled = true
      },

      onEmail() {
        console.log('onEmail')
        const text = LITERALS.EMAIL_TEXT//const
        const devs = this.$store.getters.getDblClickedDevs
        console.log('%c devs = ' + devs, 'color: orange')

        const emails = devs.map(el => el.email)

        console.log('%c emails = ' + emails, 'color: orange')
        sendEmail(emails, text)
        this.emailDisabled = true
      },

      onNewDev(item) {
        console.log('Tu onNewDev')
        this.$store.dispatch('openDialog', true)
        this.emailDisabled = true
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
    font-size: 1.2em;
    font-weight: 400;
    text-decoration: none;
  }
</style>
