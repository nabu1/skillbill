<template src="./Filter.html"></template>

<script>
  export default {
    data() {
      return {
        skill_1: '',
        rank_1: '',
        skill_2: '',
        rank_2: '',
        skill_3: '',
        rank_3: '',
        ranks: [5, 4, 3, 2, 1],
        skills: ['C', 'CPP', 'Go', 'JS', 'Java', 'ObjC', 'Ruby'],
        title: ['Junior', 'Mid', 'Senior', 'Consultant', 'Architect'],
        selectedSkills: {},
      }
    },
    methods: {
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
        console.log('%c this.selectedSkills = ' + JSON.stringify(this.selectedSkills), 'color: orange')
        this.$store.dispatch('readDevs', this.selectedSkills)
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
    },
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

  #main {
    font-family: "Roboto";
  }
</style>
