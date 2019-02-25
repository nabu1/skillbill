import axios from 'axios'
import url from './ajaxHelpers'

export const ajaxGetDevs = (context, selectedSkills) => {
  console.log('%c ajax: selectedSkills = ' + selectedSkills, 'color: white')

  axios
    .get(url(context, selectedSkills))
    .then(res => {
      //console.log('%c res.data.length = ' + res.data.length, 'color: violet')

      //context.commit('GET_DOCUMENTS_COUNT', res.data.length)
      context.commit('GET_DEVS', res.data)
    })
    .catch(err => console.log('My error: ', err))
    .finally(() => {
      //context.commit('SET_LOADING', false)
    })
}

