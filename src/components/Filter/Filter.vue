<template src="./Filter.html"></template>

<script>
  //const theSkills = ['C', 'CPP', 'Go', 'JS', 'Java', 'ObjC', 'Ruby']

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
        //skills: ['C', 'CPP', 'Go', 'JS', 'Java', 'ObjC', 'Ruby'],
        skills_1: ['C', 'CPP', 'Go', 'JS', 'Java', 'ObjC', 'Ruby'],
        skills_2: [],
        skills_3: [],
        title: ['Junior', 'Mid', 'Senior', 'Consultant', 'Architect'],
        selectedSkills: {},
      }
    },

    methods: {
      onSkill_1(skill) {
        console.log('%c onSkill_1 = ' + skill, 'color: orange')
        this.selectedSkills.skill_1 = skill

        const arr = this.skills_1.filter(el => {
          return el !== skill
        })

        console.log('%c arr = ' + arr, 'color: white')

        //this.skills_2 = ['CPP', 'Go', 'JS', 'Java', 'ObjC', 'Ruby']
        this.skills_2 = arr
      },

      onRank_1(rank) {
        console.log('%c onRank_1 = ' + rank, 'color: lime')
        this.selectedSkills.rank_1 = rank
      },

      onSkill_2(skill) {
        console.log('%c onSkill_2 = ' + skill, 'color: orange')
        this.selectedSkills.skill_2 = skill

        const arr = this.skills_2.filter(el => {
          return el !== skill
        })

        console.log('%c arr = ' + arr, 'color: white')

        //this.skills_2 = ['CPP', 'Go', 'JS', 'Java', 'ObjC', 'Ruby']
        this.skills_3 = arr

      },

      onRank_2(rank) {
        console.log('%c onRank_2 = ' + rank, 'color: lime')
        this.selectedSkills.rank_2 = rank
      },

      onSkill_3(skill) {
        console.log('%c onSkill_3 = ' + skill, 'color: orange')
        this.selectedSkills.skill_3 = skill
        this.$store.dispatch('skills', skill)
      },

      onRank_3(rank) {
        console.log('%c onRank_3 = ' + rank, 'color: lime')
        this.selectedSkills.rank_3 = rank
      },

onSearch() {
        console.log('%c this.selectedSkills = ' + JSON.stringify(this.selectedSkills), 'color: orange')
        this.$store.dispatch('progressBar', true)
        this.$store.dispatch('readDevs', this.selectedSkills)
      },
      onClear() {
        console.log('%c this.selectedSkills = ' + JSON.stringify(this.selectedSkills), 'color: lime')
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
