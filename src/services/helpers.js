export const updateView = (context, allDevs, dev) => {
  console.log('updateView')

  for(let i = 0; i < allDevs.length; i++) {
    if (allDevs[i].id === dev.id ) {
      allDevs.splice(i, 1)
      context.commit('READ_DEVS', allDevs)
      break
    }
  }
}

export const dedupeSkills = (context, skill) => {
  console.log('%c skill = ' + skill, 'color: lime')

  let skills = context.getters.getSkills
  console.log('%c helpers skills = ' + skills, 'color: gold')

  // const filteredSkills = skills.filter(el => {
  //   return el !== skill
  // })

  const index = skills.indexOf(skill)
  if (index !== -1) skills.splice(index, 1);

  console.log('%c filteredSkills = ' + skills, 'color: yellow')
  //console.log('%c filteredSkills = ' +  ['Javascript', 'Java'], 'color: yellow')

  //context.commit('SKILLS', skills)
  context.commit('SKILLS', ['Javascript', 'Java'])
}

