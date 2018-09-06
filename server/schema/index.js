import {makeExecutableSchema} from 'graphql-tools'

import customerDef from './customer/def'
import customerRes from './customer/res'
import memberDef from './member/def'
import memberRes from './member/res'

const SchemaDefinition = `
  schema {
    query: RootQuery,
    mutation: RootMutation
  }
`

const RootQuery = `
  type RootQuery {
    getCustomer(input:Int): Customer
    listUser: String
    listMember:[Member]
    listOrderHistory:[OrderHistory]
  }
`

const RootMutation = `
  type RootMutation {
    login(input:LoginInput): String
    reg(input:RegInput): String
  }
`

export default makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, RootMutation, customerDef, memberDef],
  resolvers: [customerRes, memberRes],
})
