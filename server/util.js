export const _auth = authCustomer => {
  if (!authCustomer) {
    throw new Error('Please login first!')
  }
}
