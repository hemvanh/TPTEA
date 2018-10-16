import {_procError, _ax, _post, _alert, _get} from '../../util/common'

export function loginAdmin({commit}, payload) {
  commit('setIsLoading', true)
  _post(
    payload,
    `mutation ($input: AdminLoginInput) {
      loginAdmin(input: $input)
    }`
  )
    .then(({data}) => {
      commit('setIsLoading', false)
      if (data.errors) _alert(data.errors[0].message, 'warning')
      else {
        // Login successfully
        localStorage.setItem('auth-token', data.loginAdmin)
        commit('setToken', data.loginAdmin)
        _ax.defaults.headers.common['Authorization'] = 'Bearer ' + data.loginAdmin
        _alert(`Logged In Successfully!`, 'positive')
        this.$router.push('/admin')
      }
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}
export const fetchAdmin = ({commit}) => {
  _get(`{
    getAdmin {
      username
    }
  }`)
    .then(({data}) => {
      if (data.errors) _alert(data.errors[0].message, 'warning')
      else commit('setAdmin', data.getAdmin)
    })
    .catch(err => {
      _procError(err)
    })
}
