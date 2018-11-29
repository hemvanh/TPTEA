import _ from 'lodash'
export const setToken = (state, payload) => {
  state.token = payload
}

export const setIsLoading = (state, payload) => {
  state.isLoading = payload
}

export const setIsLoadingFB = (state, payload) => {
  state.isLoadingFB = payload
}

export const setCustomer = (state, payload) => {
  state.customer = payload
}
export const setCustomerBalance = (state, payload) => {
  state.customer.balance = payload
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

export const setCurrentScannedGiftCardCode = (state, payload) => {
  state.currentScannedGiftCardCode = payload
}
export const setQRCodePaymentId = (state, payload) => {
  state.qrCodePaymentId = payload
}
