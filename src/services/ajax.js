import axios from 'axios'
import { fetch, insertDev} from './ajaxHelpers'

export const ajaxGetDevs = (context, selectedSkills) => {
  // console.log('%c ajax: selectedSkills = ' + selectedSkills, 'color: white')

  axios
    .get(fetch(context, selectedSkills))
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

export const ajaxInsertDev = dev => {
  console.log('%c Tu ajaxInsertDev: dev = ' + dev, 'color: violet')
  const axios = require('axios')
  const url = `https://api.mlab.com/api/1/databases/skillbill/collections/skillbill?apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI`

  axios.defaults.headers.post['Content-Type'] = 'application/json'

  const dev01 = {
    id: 1001,
    first: 'Fred',
    last: 'Flintstone',
    title: 'Archie',
    skill_1: 'JS',
    rank_1: 5,
    skill_2: 'Java',
    rank_2: 5,
    skill_3: 'Go',
    rank_3: 5
  }

  //axios.post(url, dev01)
  axios.post(url, dev)
    .then(res => {
      console.log(res)
      console.log(res.data)
      alert('Dane zostały zapisane na serwerze')
    })
    .catch(err =>  {
      alert('Błąd zapisu na serwerze: ', err)
    })
}
