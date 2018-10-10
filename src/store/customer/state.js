export default {
  token: localStorage.getItem('auth-token') || '',
  isLoading: false,
  name: '',
  role: '',
  customer: {},
}
