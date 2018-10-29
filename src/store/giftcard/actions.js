import {_procError, _post, _procAlert} from '../../util/common'
import _ from 'lodash'

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
