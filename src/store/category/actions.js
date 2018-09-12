/*
export function someAction (context) {
}
*/
import {_get, _procError} from '../../util/common'

export const fetchRecs = ({commit}) => {
  _get(`{
    listCategories {
      id
      name
      desc
      img
    }
  }`)
    .then(({data}) => {
      commit('setRecs', data.listCategories)
    })
    .catch(err => {
      _procError(err)
    })
}
