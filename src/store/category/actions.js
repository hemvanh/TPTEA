/*
export function someAction (context) {
}
*/
import {_get, _procError} from '../../util/common'

export const fetchCategory = ({commit}) => {
  _get(`{
    listCategories {
      id
      name
      desc
      img
    }
  }`)
    .then(({data}) => {
      commit('setRecsCategory', data.listCategories)
    })
    .catch(err => {
      _procError(err)
    })
}
