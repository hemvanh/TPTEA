const Admin = `
  type Admin {
    id: Int
    username: String
    password: String
    roles:String
  }
  input AdminLoginInput {
    username: String!
    password: String!
  }
  input ReceivePaymentInput {
    amount: Float!
    jwtPayment: String!
  }
  type ReceivePayment {
    balance: Float
    username: String
    chargedAmount: Float
  }
`
export default Admin
