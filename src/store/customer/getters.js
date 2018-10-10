export const getIsAuth = state => !!state.token

export const getIsLoading = state => {
  return state.isLoading
}

export const getCustomer = state => {
  return state.customer
}
