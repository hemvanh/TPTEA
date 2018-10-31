const Customer = `
  scalar Date
  type Customer {
    id: Int
    username: String
    password: String
    name: String
    address: String
    phone: String
    balance: Float
    points: Int
    createdAt: Date
  }
  input CustomerInput {
    id: Int
    username: String!
    password: String
    name: String
    address: String
    phone: String
    balance: Float
    points: Int
  }
  input LoginInput {
    username: String!
    password: String!
    type: String
  }
  input RegisterInput {
    username: String!
    password: String!
    passwordConfirm: String!
    name: String,
    phone: String
    address: String
    type: String
  }
  type RegisterFbResponse {
    token :String
    msg: String
  }

  input ApplyGiftCardInput {
    jwt: String!
    customerId: Int!
  }
`
export default Customer
