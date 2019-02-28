import axios from 'axios'
import { LITERALS } from '../services/constants'
import { fetch } from './ajaxHelpers'

export const ajaxGetDevs = (context, selectedSkills) => {
  axios
    .get(fetch(context, selectedSkills))
    .then(res => {
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
  //const countUrl = `https://api.mlab.com/api/1/databases/skillbill/collections/skillbill?&c=true&apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI`
  const countUrl = LITERALS.PREFIX + '?&c=true' + '&apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI'

  axios.defaults.headers.post['Content-Type'] = 'application/json'

  const getCount = async () => {
    return axios.get(countUrl)
      .then(res => {
        console.log('%c res.data = ' + res.data, 'color: orange')
        return res.data
      })
      .catch(err => console.log('Error 1: ', err))
  }

  const getLastDocument = async lastDocumentUrl => {
    console.log('%c lastDocumentUrl = ' + lastDocumentUrl, 'color: white')
    return axios.get(lastDocumentUrl)
      .then(res => {
        console.log('%c res.data = ' + JSON.stringify(res.data), 'color: orange')
        return res.data
      })
      .catch(err => console.log('Error 2: ', err))
  }

  const insertDocument = async (url, dev, lastDocumentId) => {
    console.log('%c url = ' + JSON.stringify(url), 'color: orange')
    console.log('%c stary dev = ' + JSON.stringify(dev), 'color: orange')
    console.log('%c new lastDocumentId = ' + JSON.stringify(lastDocumentId), 'color: orange')
    dev.id = lastDocumentId
    console.log('%c nowy dev = ' + JSON.stringify(dev), 'color: orange')

    return axios.post(url, dev)
      .then(res => {
        console.log(res)
        console.log(res.data)
        alert('Dane zostały zapisane na serwerze')
      })
      .catch(err =>  {
        alert('Błąd zapisu na serwerze: ', err)
      })
  }

  async function insertDev() {
    try {
      const count = await getCount()

      const lastDocument = await getLastDocument(LITERALS.PREFIX + `?sk=${count - 1}` + '&apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI')

      /* console.log('%c lastDocumentId = ' + lastDocumentId, 'color: orange')
      console.log('%c lastDocumentId + 1 = ' + lastDocumentId + 1, 'color: orange')
      */

      //await insertDocument(url, dev, lastDocument.id)
    }
    catch (err) {
      console.log('Wystapił błąd: ', err)
    }
  }

  insertDev()



  // async function getCount (para) {
  //   return await
  // }

  // async function getLastDocument (para) {
  //   return await sleep(para)
  // }

  // async function insertDocument (para) {
  //   return await sleep(para)
  // }


  // axios.get(countUrl)
  //   .then(res => {
  //     console.log('%c res = ' + res.data, 'color: orange')
  //     dev.id = res.data

  //     axios.post(url, dev)
  //       .then(res => {
  //         console.log(res)
  //         console.log(res.data)
  //         alert('Dane zostały zapisane na serwerze')
  //       })
  //       .catch(err =>  {
  //         alert('Błąd zapisu na serwerze (1): ', err)
  //       })
  //   })
  //   .catch(err => {
  //     alert('Błąd zapisu na serwerze (2): ', err)
  //   })
}

export const ajaxDelete = _id => {
  //console.log('%c _id = ', 'color: white')
  //console.log(_id.replace(/"/g, ''))
  const url = `${LITERALS.PREFIX}/${_id.replace(/"/g, '')}?apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI`
  console.log('%c url = ' + url, 'color: white')

  axios.delete(url)
    .then(res => {

      console.log('Skasowany ziutex: ', res)
    })
    .catch(err => console.log('Błąd: ', err))
}

//export const ajaxUpdateDates = (_id, dates) => {
export const ajaxUpdateDates = (_id, dates) => {
  console.log('%c dates = ', 'color: orange')
  console.log(dates)
  console.log('%c _id = ' + _id, 'color: orange')
  // console.log('%c id = ' + id, 'color: orange')

  const axios = require('axios')
  const url = `${LITERALS.PREFIX}/${_id.replace(/"/g, '')}?apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI`
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  //const url = `${LITERALS.PREFIX}/id=${id}?apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI`

  console.log('%c url = ' + url, 'color: white')

  const datesObj = { "$set" : { "dates" : dates } }


  axios.put(url, datesObj)
  // axios.put(url, JSON.stringify(dates))
    .then(res => {
      console.log(res)
      console.log(res.data)
      alert('Daty zostały zapisane na serwerze')
    })
    .catch(err =>  {
      alert('Błąd zapisu dat na serwerze: ', err)
    })
}
