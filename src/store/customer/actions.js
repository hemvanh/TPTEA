import {_procError, _ax, _post, _alert, _get} from '../../util/common'

export function loginCustomer({commit}, payload) {
  commit('setIsLoading', true)
  _post(
    payload,
    `mutation ($input: LoginInput) {
      login(input: $input)
    }`
  )
    .then(({data}) => {
      commit('setIsLoading', false)
      if (data.errors) _alert(data.errors[0].message, 'warning')
      else {
        // Login successfully
        localStorage.setItem('auth-token', data.login)
        commit('setToken', data.login)
        _ax.defaults.headers.common['Authorization'] = 'Bearer ' + data.login
        _alert(`Logged In Successfully!`, 'positive')
        this.$router.push('/customer')
      }
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}

export function regCustomer({commit}, payload) {
  commit('setIsLoading', true)
  _post(
    payload,
    `mutation ($input: RegisterInput) {
      register(input: $input)
    }`
  )
    .then(({data}) => {
      commit('setIsLoading', false)
      if (data.errors) _alert(data.errors[0].message, 'warning')
      else {
        // register successfully
        localStorage.setItem('auth-token', data.register)
        commit('setToken', data.register)
        _ax.defaults.headers.common['Authorization'] = 'Bearer ' + data.register
        _alert(`Regitered Successfully!`, 'positive')
        this.$router.push('/customer')
      }
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}

export async function loginFb({commit}, payload) {
  var user = await getUserFbInfo()
  _post(
    {
      username: user.email,
      password: '',
      type: 'facebook',
    },
    `mutation ($input: LoginInput) {
      loginFb(input: $input)
    }`
  )
    .then(({data}) => {
      if (data.errors) _alert(data.errors[0].message, 'warning')
      else {
        // Login successfully
        localStorage.setItem('auth-token', data.loginFb)
        commit('setToken', data.loginFb)
        _ax.defaults.headers.common['Authorization'] = 'Bearer ' + data.loginFb
        _alert(`Logged In Successfully!`, 'positive')
        this.$router.push('/customer')
      }
    })
    .catch(err => {
      _procError(err)
    })
}
export async function registerFb({commit}) {
  var user = await getUserFbInfo()
  _post(
    {
      username: user.email,
      password: '',
      passwordConfirm: '',
      name: user.name,
      phone: '',
      address: '',
      type: 'facebook',
    },
    `mutation ($input: RegisterInput) {
      registerFb(input: $input) {
        token
        msg
      }
    }`
  )
    .then(({data}) => {
      if (data.errors) _alert(data.errors[0].message, 'warning')
      else {
        // register successfully
        localStorage.setItem('auth-token', data.registerFb.token)
        commit('setToken', data.regFB)
        _ax.defaults.headers.common['Authorization'] = 'Bearer ' + data.registerFb.token
        _alert(data.registerFb.msg, 'positive')
        this.$router.push('/customer')
      }
    })
    .catch(err => {
      _procError(err)
    })
}
async function getUserFbInfo() {
  return new Promise(resolve => {
    window.FB.login(
      res => {
        if (res.status === 'connected') {
          window.FB.api('/me?fields=name,email', person => {
            resolve(person)
          })
        }
      },
      {scope: 'public_profile,email'}
    )
  })
}
export const fetchCustomer = ({commit}) => {
  _get(`{
    getCustomer {
      name
      balance
      points
    }
  }`)
    .then(({data}) => {
      commit('setCustomer', data.getCustomer)
    })
    .catch(err => {
      _procError(err)
    })
}
