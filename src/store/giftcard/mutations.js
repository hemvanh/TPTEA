export const setIsLoading = (state, payload) => {
  state.isLoading = payload
}

export const setCurrentGenGiftCardCode = (state, payload) => {
  state.currentGenGiftCardCode = payload
}

export const setRecs = (state, payload) => {
  state.recs = payload
}

export const setSelected = (state, payload) => {
  state.selected = payload
}

export const setEditingRec = state => {
  state.isModalOpened = true
}

export const setIsModalOpened = (state, payload) => {
  state.isModalOpened = payload
}

export const setIsModalQRCodeOpened = (state, payload) => {
  state.isModalQRCodeOpened = payload
}

export const setPrintingRec = (state, payload) => {
  state.isModalPrintOpened = true
}

export const setIsModalPrintOpened = (state, payload) => {
  state.isModalPrintOpened = payload
}
