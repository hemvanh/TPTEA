export const getIsAuth = state => !!state.token

export const getIsLoading = state => {
  return state.isLoading
}

export const getAdmin = state => {
  return state.admin
}

export const getIsDialogOpenned = state => {
  return state.isDialogOpenned
}

export const getReceived = state => {
  return state.received
}

export const getIsDisabled = state => {
  return state.isDisabled
}
