export default {
  token: localStorage.getItem('auth-token') || '',
  isLoading: false,
  admin: {},
  isDialogOpenned: false,
  received: {},
  isDisabled: false,
}
