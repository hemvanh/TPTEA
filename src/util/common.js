import axios from 'axios'
import {Notify} from 'quasar'

export const _ax = axios.create({
  timeout: 20000,
  // remove the abundant "data" key from grahql response
  transformResponse: axios.defaults.transformResponse.concat(data => {
    if (Object.keys(data).length === 1) return data.data
    else return data // keep all data properties
  }),
})

// get auth token, to make sure all _get _post require got auth-token attached
let getToken = () => {
  if (localStorage.getItem('auth-token')) {
    return localStorage.getItem('auth-token').slice(0, -1)
  }
  return null
}
let setToken = () => {
  let token = getToken()
  if (token) {
    _ax.defaults.headers.common['Authorization'] = 'Bearer ' + token
  } else {
    delete _ax.defaults.headers.common['Authorization']
  }
}

export const _get = query => {
  setToken()
  return _ax.get('/api', {
    params: {
      query: query,
    },
  })
}

export const _post = (input, query) => {
  setToken()
  return _ax({
    method: 'post',
    url: '/api',
    headers: {'Content-Type': 'application/json'},
    data: JSON.stringify({query, variables: {input}}),
  })
}

export const _alert = (message, type) => {
  Notify.create({
    message,
    type,
    timeout: 2000,
  })
}

export const _procAlert = (data, successMessage) => {
  if (data.errors) _alert(data.errors[0].message, 'warning')
  else if (successMessage) {
    _alert(successMessage === true ? 'Successfully!' : successMessage, 'positive')
  }
}

export const _procError = err => {
  if (err.response) _alert(`Code: ${err.response.status} - ${err.response.statusText}`, 'negative')
  else _alert(`Code: ${err.message}`, 'negative')
}

export function isAuth() {
  return !!localStorage.getItem('auth-token')
}

export function getUserType() {
  let token = localStorage.getItem('auth-token')
  return token ? token.substr(token.length - 1) : null
}
