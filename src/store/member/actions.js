import {_get, _procError} from '../../util/common'

export const fetchRecs = ({commit}) => {
  _get(`{
    listMember {
      id
      name
      add
      phone
      balance
      points
    }
  }`)
    .then(({data}) => {
      commit('setRecs', data.listMember[0])
    })
    .catch(err => {
      _procError(err)
    })
}
