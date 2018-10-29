import {_procError, _ax, _post, _get, _procAlert} from '../../util/common'

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
      _procAlert(data, `Logged In Successfully!`)
      if (!data.errors) {
        // Login successfully
        localStorage.setItem('auth-token', data.loginAdmin)
        commit('setToken', data.loginAdmin)
        _ax.defaults.headers.common['Authorization'] = 'Bearer ' + data.loginAdmin
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
    fetchAdmin {
      username
    }
  }`)
    .then(({data}) => {
      _procAlert(data, true)
      commit('setAdmin', data.fetchAdmin)
    })
    .catch(err => {
      _procError(err)
    })
}
