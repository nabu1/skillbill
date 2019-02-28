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

  const getLastDocumentId = async lastDocumentUrl => {
    console.log('%c lastDocumentUrl = ' + lastDocumentUrl, 'color: white')
    return axios.get(lastDocumentUrl)
      .then(res => {
        console.log('%c res.data[0].last = ' + JSON.stringify(res.data[0].last), 'color: orange')
        console.log('%c res.data[0].id = ' + JSON.stringify(res.data[0].id), 'color: orange')
        return res.data[0].id
      })
      .catch(err => console.log('Error 2: ', err))
  }

  const insertDocument = async (url, dev, lastDocumentId) => {
    console.log('%c url = ' + JSON.stringify(url), 'color: orange')
    console.log('%c dev = ' + JSON.stringify(dev), 'color: orange')
    console.log('%c lastDocumentId = ' + JSON.stringify(lastDocumentId), 'color: orange')
    dev.id = lastDocumentId + 1
    console.log('%c nowy dev = ' + JSON.stringify(dev), 'color: orange')

    return axios.post(url, dev)
      .then(res => {
        console.log(JSON.stringify(res.data))
        alert('Dane zostały zapisane na serwerze')
      })
      .catch(err =>  {
        alert('Błąd zapisu na serwerze: ', err)
      })
  }

  async function insertDev() {
    try {
      const count = await getCount() -1

      const lastDocumentId = await getLastDocumentId(LITERALS.PREFIX + `?sk=${count}` + '&apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI')

      await insertDocument(url, dev, lastDocumentId)
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

export const ajaxDeleteDev = _id => {
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

export const ajaxUpdateDev = dev => {
  const axios = require('axios')
  axios.defaults.headers.post['Content-Type'] = 'application/json'

  console.log('%c ajaxUpdateDev dev = ' + JSON.stringify(dev), 'color: orange')
  console.log('%c ajaxUpdateDev dev._id = ' + JSON.stringify(dev._id.$oid), 'color: orange')

  const url = `${LITERALS.PREFIX}/${dev._id.$oid.replace(/"/g, '')}?apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI`
  console.log('%c ajaxUpdateDev url = ' + url, 'color: orange')

  axios.put(url, dev)
  // axios.put(url, JSON.stringify(dates))
    .then(res => {
      console.log(res.data)
      alert('Dane zostały uaktualnione')
    })
    .catch(err =>  {
      alert('Błąd zapisu dat na serwerze: ', err)
    })
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
