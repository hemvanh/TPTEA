import { _procError, _ax, _post, _get, _procAlert, getUserFbInfo } from '../../util/common'
import _ from 'lodash'
export function loginCustomer({ commit }, payload) {
  commit('setIsLoading', true)
  _post(
    payload,
    `mutation ($input: LoginInput) {
      login(input: $input)
    }`
  )
    .then(({ data }) => {
      commit('setIsLoading', false)
      _procAlert(data, 'Logged In Successfully!')
      if (!data.errors) {
        // Login successfully
        localStorage.setItem('auth-token', data.login)
        commit('setToken', data.login)
        _ax.defaults.headers.common['Authorization'] = 'Bearer ' + data.login
        this.$router.push('/customer')
      }
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}

export function regCustomer({ commit }, payload) {
  commit('setIsLoading', true)
  _post(
    payload,
    `mutation ($input: RegisterInput) {
      register(input: $input)
    }`
  )
    .then(({ data }) => {
      commit('setIsLoading', false)
      _procAlert(data, 'Regitered Successfully!')
      if (!data.errors) {
        // register successfully
        localStorage.setItem('auth-token', data.register)
        commit('setToken', data.register)
        _ax.defaults.headers.common['Authorization'] = 'Bearer ' + data.register
        this.$router.push('/customer')
      }
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}

export async function loginFb({ commit }) {
  commit('setIsLoadingFB', true)
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
    .then(({ data }) => {
      commit('setIsLoadingFB', false)
      _procAlert(data, 'Logged In Successfully!')
      if (!data.errors) {
        // Login successfully
        localStorage.setItem('auth-token', data.loginFb)
        commit('setToken', data.loginFb)
        _ax.defaults.headers.common['Authorization'] = 'Bearer ' + data.loginFb
        this.$router.push('/customer')
      }
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoadingFB', false)
    })
}
export async function registerFb({ commit }) {
  commit('setIsLoadingFB', true)
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
    .then(({ data }) => {
      commit('setIsLoadingFB', false)
      _procAlert(data, data.registerFb.msg)
      if (!data.errors) {
        // register successfully
        localStorage.setItem('auth-token', data.registerFb.token)
        commit('setToken', data.registerFb)
        _ax.defaults.headers.common['Authorization'] = 'Bearer ' + data.registerFb.token
        this.$router.push('/customer')
      }
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoadingFB', false)
    })
}

export const fetchCustomer = ({ commit }) => {
  _get(`{
    getCustomer {
      id
      name
      balance
      points
    }
  }`)
    .then(({ data }) => {
      _procAlert(data)
      commit('setCustomer', data.getCustomer)
    })
    .catch(err => {
      _procError(err)
    })
}

export const fetchCustomers = ({ commit }) => {
  commit('setIsLoading', true)
  _get(`{
    fetchCustomers {
      id
      name
      username
      password
      address
      phone
      balance
      points
    }
  }`)
    .then(({ data }) => {
      _procAlert(data, true)
      commit('setRecs', data.fetchCustomers)
      commit('setIsLoading', false)
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}

export const delCustomers = ({ commit, getters }) => {
  commit('setIsLoading', true)
  let ids = Array.from(getters.getSelected, customer => customer.id)
  _post(
    ids,
    `mutation ($input: [Int]) {
      deleteCustomers(input: $input)
    }`
  ).then(({ data }) => {
    _procAlert(data, true)
    commit('setIsLoading', false)
    _.remove(getters.getRecs, rec => {
      return ids.includes(rec.id)
    })
    // clear selection
    commit('setSelected', [])
    // reactive the grid with new recs
    commit('setRecs', _.clone(getters.getRecs))
  })
}

export const updateCustomer = ({ commit, getters }) => {
  commit('setIsLoading', true)
  _post(
    _.omit(getters.getEditingRec, ['__index']),
    `mutation ($input: CustomerInput) {
      updateCustomer(input: $input) {
        id
        username
        password
        name
        address
        phone
        balance
        points
      }
    }`
  )
    .then(({ data }) => {
      _procAlert(data, true)
      commit('setIsLoading', false)
      commit('setIsModalOpened', false)
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}

export function createCustomer({ commit, getters }) {
  commit('setIsLoading', true)
  _post(
    getters.getEditingRec,
    `mutation ($input: CustomerInput) {
      createCustomer(input: $input) {
        id
        username
        password
        name
        address
        phone
        balance
        points
      }
    }`
  )
    .then(({ data }) => {
      commit('setIsLoading', false)
      _procAlert(data, true)
      commit('setIsModalOpened', false)
      getters.getRecs.push(data.createCustomer)
      commit('setRecs', _.clone(getters.getRecs))
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}

export const applyGiftCard = ({ commit }, payload) => {
  commit('setIsLoading', true)
  _post(
    payload,
    `mutation ($input: ApplyGiftCardInput) {
      applyGiftCard(input: $input){
        balance
        amount
      } 
    }`
  )
    .then(({ data }) => {
      let amount = (data.applyGiftCard && data.applyGiftCard.amount) || 0
      _procAlert(data, `$${amount} has just been applied successfully`)
      if (data.applyGiftCard) commit('setCustomerBalance', data.applyGiftCard.balance)
    })
    .catch(err => {
      _procError(err)
    })
    .finally(() => {
      commit('setIsLoading', false)
      commit('setCurrentScannedGiftCardCode', '')
    })
}
export function genCustomerPaymentId({ commit, getters }) {
  var customer = getters.getCustomer
  commit('setIsLoading', true)
  _post(
    customer.id,
    `query ($input: Int) {
      genCustomerPaymentId(input: $input)
    }`
  )
    .then(({ data }) => {
      _procAlert(data, 'Payment Id Generated!')
      if (!data.errors) {
        commit('setQRCodePaymentId', data.genCustomerPaymentId)
      }
    })
    .catch(err => {
      _procError(err)
    })
    .finally(() => {
      commit('setIsLoading', false)
    })
}
