import {_procError, _post, _get, _procAlert} from '../../util/common'
import _ from 'lodash'

export const fetchGiftcards = ({commit}) => {
  commit('setIsLoading', true)
  _get(`{
    fetchGiftCards {
      id
      code
      userName
      amount
      expiry
      createdAt    
      updatedAt  
    }
  }`)
    .then(({data}) => {
      _procAlert(data, true)
      commit('setRecs', data.fetchGiftCards)
      commit('setIsLoading', false)
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}

export const delGiftcards = ({commit, getters}) => {
  commit('setIsLoading', true)
  let ids = Array.from(getters.getSelected, giftcard => giftcard.id)
  _post(
    ids,
    `mutation ($input: [Int]) {
      deleteGiftCards(input: $input)
    }`
  ).then(({data}) => {
    _procAlert(data, true)
    commit('setIsLoading', false)
    _.remove(getters.getRecs, rec => {
      return ids.includes(rec.id)
    })
    commit('setSelected', [])
    commit('setRecs', _.clone(getters.getRecs))
  })
}

export const updateGiftCard = ({commit, getters}) => {
  commit('setIsLoading', true)
  _post(
    _.omit(getters.getEditingRec, ['__index']),
    `mutation ($input: [String]) {
      updateGiftCard(input: $input) 
    }`
  )
    .then(({data}) => {
      _procAlert(data)
      commit('setIsLoading', false)
      commit('setIsModalOpened', false)
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}

export function genGiftCard({commit}, payload) {
  commit('setIsLoading', true)
  _post(
    payload,
    `mutation ($input:GenGiftCardInput) {
      genGiftCard(input: $input)
    }`
  )
    .then(({data}) => {
      commit('setIsLoading', false)
      _procAlert(data, 'Generate Successfully!')
      // if (!data.errors) {
      commit('setCurrentGenGiftCardCode', data.genGiftCard)
      // }
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}
