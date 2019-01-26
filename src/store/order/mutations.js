import _ from 'lodash'
export const setToken = (state, payload) => {
  state.token = payload
}

export const setIsLoading = (state, payload) => {
  state.isLoading = payload
}

export const setRecs = (state, payload) => {
  state.recs = payload
}

export const setSelected = (state, payload) => {
  state.selected = payload
}

export const setEditingRec = (state, payload) => {
  payload.password = ''
  state.editingRec = payload
  state.backupRec = _.clone(payload)
  state.isModalOpened = true
}

export const discardEditingRec = state => {
  _.extend(state.editingRec, state.backupRec)
  state.isModalOpened = false
}

export const setIsModalOpened = (state, payload) => {
  state.isModalOpened = payload
}