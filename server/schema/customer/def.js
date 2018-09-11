const Customer = `
  scalar Date
  type Customer {
    id: Int
    username: String
    password: String
    name: String
    add: String
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
    add: String
    phone: String
    balance: Float
    points: Int
  }
  input LoginInput {
    username: String!
    password: String!
  }
  input RegInput {
    username: String!
    password: String!
    passwordConfirm: String!
    fullName: String,
    phone: String
    address: String
  }
`
export default Customer
