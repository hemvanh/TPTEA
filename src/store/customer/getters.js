export const getIsAuth = state => !!state.token

export const getIsLoading = state => {
  return state.isLoading
}

export const getIsLoadingFB = state => {
  return state.isLoadingFB
}

export const getCustomer = state => {
  return state.customer
}
export const getRecs = state => {
  return state.recs
}

export const getCols = state => {
  return state.cols
}

export const getFields = state => {
  return state.fields
}

export const getTitle = state => {
  return state.title
}

export const getIcon = state => {
  return state.icon
}

export const getSelected = state => {
  return state.selected
}

export const getIsModalOpened = state => {
  return state.isModalOpened
}

export const getEditingRec = state => {
  return state.editingRec
}

export const getCurrentScannedGiftCardCode = state => {
  return state.currentScannedGiftCardCode
}

export const getQRCodePaymentId = state => {
  return state.qrCodePaymentId
}
