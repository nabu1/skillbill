import axios from 'axios'
import { LITERALS } from '../services/constants'
import { fetch } from './ajaxHelpers'
import { updateView } from './helpers'

export const ajaxReadDevs = (context, selectedSkills) => {
  axios
    .get(fetch(context, selectedSkills))
    .then(res => {
      context.commit('READ_DEVS', res.data)
    })
    .catch(err => console.log('My error: ', err))
    .finally(() => {

    })
}

export const ajaxInsertDev = dev => {
  const axios = require('axios')
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  const url = `https://api.mlab.com/api/1/databases/skillbill/collections/skillbill?apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI`
  const countUrl = LITERALS.PREFIX + '?&c=true' + '&apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI'

  const getCount = async () => {
    return axios.get(countUrl)
      .then(res => {

        return res.data
      })
      .catch(err => console.log('Error 1: ', err))
  }

  const getLastDocumentId = async lastDocumentUrl => {
    return axios.get(lastDocumentUrl)
      .then(res => {
        return res.data[0].id
      })
      .catch(err => console.log('Error 2: ', err))
  }

  const insertDocument = async (url, dev, lastDocumentId) => {
    dev.id = lastDocumentId + 1
    return axios.post(url, dev)
      .then(res => {
        console.log('Dane zostały zapisane na serwerze')
      })
      .catch(err => {
        alert('Błąd zapisu na serwerze: ', err)
      })
  }

  async function insertDev() {
    try {
      const count = await getCount() - 1
      const lastDocumentId = await getLastDocumentId(LITERALS.PREFIX + `?sk=${count}` + '&apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI')
      await insertDocument(url, dev, lastDocumentId)
    }
    catch (err) {
      alert('Błąd modyfikacji danych na serwerze: ', err)
    }
  }
  insertDev()
}

export const ajaxDeleteDev = (context, dev) => {
  const allDevs = context.getters.readDevs
  const _id = dev._id.$oid
  const url = `${LITERALS.PREFIX}/${_id.replace(/"/g, '')}?apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI`
  axios.delete(url)
    .then(res => {

      updateView(context, allDevs, dev)
    })
    .catch(err => console.log('Błąd: ', err))
}

export const ajaxUpdateDev = (context, dev) => {
  const axios = require('axios')
  axios.defaults.headers.post['Content-Type'] = 'application/json'

  const url = `${LITERALS.PREFIX}/${dev._id.$oid.replace(/"/g, '')}?apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI`
  const allDevs = context.getters.readDevs  //.push(dev)

  axios.put(url, dev)
    .then(res => {
      for(let i = 0; i < allDevs.length; i++) {
        if (allDevs[i].id === dev.id ) {
          allDevs.splice(i, 1)
          allDevs.push(dev)
          context.commit('READ_DEVS', allDevs)
          break
        }
      }
      console.log('Dane zostały uaktualnione')
    })
    .catch(err => {
      alert('Błąd zapisu dat na serwerze: ', err)
    })
}

export const ajaxUpdateDates = (context, calendarDev) => {
  console.log('%c calendarDev = ' + JSON.stringify(calendarDev), 'color: white')

  const axios = require('axios')
  axios.defaults.headers.post['Content-Type'] = 'application/json'

  const _id = calendarDev._id.$oid
  const dates = calendarDev.dates
  const url = `${LITERALS.PREFIX}/${_id.replace(/"/g, '')}?apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI`

  const allDevs = context.getters.readDevs
  const datesObj = { "$set": { "dates": dates } }

  axios.put(url, datesObj)
    .then(res => {
      for(let i = 0; i < allDevs.length; i++) {
        if (allDevs[i].id === calendarDev.id ) {
          allDevs.splice(i, 1)
          allDevs.push(calendarDev)
          break
        }
      }

      context.commit('READ_DEVS', allDevs)
      console.log('Daty zapisano na serwerze')
    })
    .catch(err => {
      alert('Błąd zapisu dat na serwerze: ', err)
    })
}
