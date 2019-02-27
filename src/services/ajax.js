import axios from 'axios'
import { LITERALS } from '../services/constants'
import { fetch } from './ajaxHelpers'

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
  console.log('%c Tu ajaxInsertDev: dev = ' + JSON.stringify(dev), 'color: violet')
  const axios = require('axios')
  const url = `https://api.mlab.com/api/1/databases/skillbill/collections/skillbill?apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI`
  const countUrl = `https://api.mlab.com/api/1/databases/skillbill/collections/skillbill?&c=true&apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI`

  axios.defaults.headers.post['Content-Type'] = 'application/json'


  axios.get(countUrl)
    .then(res => {
      console.log('%c res = ' + res, 'color: blue')
      dev.id = res.data

      axios.post(url, dev)
        .then(res => {
          console.log(res)
          console.log(res.data)
          alert('Dane zostały zapisane na serwerze')
        })
        .catch(err =>  {
          alert('Błąd zapisu na serwerze (1): ', err)
        })
    })
    .catch(err => {
      alert('Błąd zapisu na serwerze (2): ', err)
    })
}

export const ajaxDelete = _id => {
  //console.log('%c _id = ', 'color: white')
  //console.log(_id.replace(/"/g, ''))
  const url = `${LITERALS.PREFIX}/${_id.replace(/"/g, '')}?apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI`

  console.log('%c url = ' + url, 'color: white')

  axios.delete(url)
    .then(res => console.log('Skasowany ziutex: ', res))
    .catch(err => console.log('Błąd: ', err))
}

export const ajaxUpdateDates = (_id, dates) => {
  console.log('%c dates = ' + dates, 'color: orange')
  console.log('%c _id = ' + _id, 'color: orange')

  const axios = require('axios')
  const url = `https://api.mlab.com/api/1/databases/skillbill/collections/skillbill?apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI`
  const countUrl = `https://api.mlab.com/api/1/databases/skillbill/collections/skillbill?&c=true&apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI`

  axios.defaults.headers.post['Content-Type'] = 'application/json'

  axios.get(countUrl)
    .then(res => {
      console.log('%c res = ' + res, 'color: blue')
      dev.id = res.data

      axios.post(url, dev)
        .then(res => {
          console.log(res)
          console.log(res.data)
          alert('Dane zostały zapisane na serwerze')
        })
        .catch(err =>  {
          alert('Błąd zapisu na serwerze (1): ', err)
        })
    })
    .catch(err => {
      alert('Błąd zapisu na serwerze (2): ', err)
    })
}
