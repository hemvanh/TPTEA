/*
export function someAction (context) {
}
*/

import {_post, _procError} from '../../util/common'

export const fetchMenus = ({commit}, payload) => {
  _post(
    payload,
    `query ($input: CategoryInput) {
      listMenus(input: $input) {
        id
        name
        desc
        price
        img
      }
    }`
  )
    .then(({data}) => {
      commit('setRecsMenu', data.listMenus)
    })
    .catch(err => {
      _procError(err)
    })
}
