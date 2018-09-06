import {_procError, _ax, _post, _alert} from '../../util/common'

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
        this.$router.push('/member')
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
    `mutation ($input: RegInput) {
      reg(input: $input)
    }`
  )
    .then(({data}) => {
      commit('setIsLoading', false)
      if (data.errors) _alert(data.errors[0].message, 'warning')
      else {
        // register successfully
        localStorage.setItem('auth-token', data.reg)
        commit('setToken', data.reg)
        _ax.defaults.headers.common['Authorization'] = 'Bearer ' + data.reg
        _alert(`Regitered Successfully!`, 'positive')
        this.$router.push('/member')
      }
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}
