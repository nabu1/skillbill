<template src="./Filter.html"></template>

<script>
export default {
  data() {
    return {
      skill1: '',
      rank1: '',
      skill2: '',
      rank2: '',
      skill3: '',
      rank3: '',
      ranks: [5, 4, 3, 2, 1],
      skills_1: ['C', 'CPP', 'Go', 'JS', 'Java', 'ObjC', 'Ruby'],
      skills_2: [],
      skills_3: [],
      title: ['Junior', 'Mid', 'Senior', 'Consultant', 'Architect'],
      selectedSkills: {},
    }
  },

  methods: {
    onSkill_1(skill) {
      this.selectedSkills.skill1 = skill

      const arr = this.skills_1.filter(el => el !== skill)

      this.skills_2 = arr
    },

    onRank_1(rank) {
      this.selectedSkills.rank1 = rank
    },

    onskill2(skill) {
      this.selectedSkills.skill2 = skill

      const arr = this.skills_2.filter(el => el !== skill)

      this.skills_3 = arr
    },

    onRank_2(rank) {
      this.selectedSkills.rank2 = rank
    },

    onSkill_3(skill) {
      this.selectedSkills.skill3 = skill
    },

    onRank_3(rank) {
      this.selectedSkills.rank3 = rank
    },

    onSearch() {
      this.$store.dispatch('progressBar', true)
      this.$store.dispatch('readDevs', this.selectedSkills)
    },
    onClear() {
      this.selectedSkills = {}
      this.skill_1 = null
      this.skill2 = null
      this.skill3 = null
      this.rank1 = null
      this.rank2 = null
      this.rank3 = null
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
  font-family: 'Roboto';
}
</style>
