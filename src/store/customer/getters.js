export const getIsAuth = state => !!state.token

export const getIsLoading = state => {
  return state.isLoading
}

export const getIsHiddenRegBtn = state => {
  return state.isHiddenRegBtn
}
