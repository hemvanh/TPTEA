import {_post, _procError} from '../../util/common'
import _ from 'lodash'

export const fetchModifiers = ({commit}, payload) => {
  _post(
    payload,
    `query ($input: MenuInput) {
      fetchModifiers(input: $input) {
        id
        name
        price
        type
      }
    }`
  )
    .then(({data}) => {
      commit('setRecs', _.sortBy(data.fetchModifiers, ['type']).reverse())
    })
    .catch(err => {
      _procError(err)
    })
}
