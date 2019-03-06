function updateView(context, allDevs, dev) {
  console.log('updateView')

  for(let i = 0; i < allDevs.length; i++) {
    if (allDevs[i].id === dev.id ) {
      allDevs.splice(i, 1)
      context.commit('READ_DEVS', allDevs)
      break
    }
  }
}

function skills(skill) {
  console.log('%c skill = ' + skill, 'color: lime')
  // let skills = ['C', 'CPP', 'Go', 'JS', 'Java', 'ObjC', 'Ruby']
  let skills = this.$store.getters.getSkills

  skills = skills.filter(el => {
    return el !== skill
  })

  this.$store.dispatch('skills', skills)
}



module.exports.updateView = updateView
module.exports.skills = skills
