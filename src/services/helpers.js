function updateView(devs, item) {
  console.log('updateView')

  for(let i = 0; i < devs.length; i++) {
    if (devs[i].id === item.id ) {
      devs.splice(i, 1)
      this.$store.commit('READ_DEVS', devs)
      break
    }
  }
}

module.exports.updateView = updateView
