import axios from 'axios'
import { LITERALS } from '../services/constants'
import { fetch, findText } from './ajaxHelpers'
import { updateView } from './helpers'

axios.defaults.headers.post['Content-Type'] = 'application/json'

export const ajaxReadDevs = (context, selectedSkills) => {
  axios
    .get(fetch(context, selectedSkills))
    .then(res => {
      context.commit('READ_DEVS', res.data)
    })
    .catch(err => console.log('My error: ', err))
    .finally(() => {
      context.commit('PROGRESS_BAR', false)
    })
}

export const ajaxInsertDev = dev => {
  const url = `https://api.mlab.com/api/1/databases/skillbill/collections/skillbill?s={id:1}&apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI`
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
      const query = LITERALS.PREFIX + `?s={id:1}&sk=${count}&l=1` + '&apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI'
      const lastDocumentId = await getLastDocumentId(query)
      await insertDocument(url, dev, lastDocumentId)
      context.commit('PROGRESS_BAR', false)

    }
    catch (err) {
      context.commit('PROGRESS_BAR', false)
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
    .finally(() => {
      context.commit('PROGRESS_BAR', false)
    })
}

export const ajaxUpdateDev = (context, dev) => {
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
    .finally(() => {
      context.commit('PROGRESS_BAR', false)
    })
}

export const ajaxUpdateDates = (context, calendarDev) => {
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
    .finally(() => {
      context.commit('PROGRESS_BAR', false)
    })
}

export const ajaxFindText = (context, text) => {
  axios
    .get(findText(text))
    .then(res => {
      context.commit('READ_DEVS', res.data)
    })
    .catch(err => console.log('My error: ', err))
    .finally(() => {
      context.commit('PROGRESS_BAR', false)
    })
}
