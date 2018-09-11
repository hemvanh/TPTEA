import {makeExecutableSchema} from 'graphql-tools'

import customerDef from './customer/def'
import customerRes from './customer/res'
import categoryDef from './category/def'
import categoryRes from './category/res'

const SchemaDefinition = `
  schema {
    query: RootQuery,
    mutation: RootMutation
  }
`

const RootQuery = `
  type RootQuery {
    getCustomer(input:Int): Customer
    listCategories: [Category]
  }
`

const RootMutation = `
  type RootMutation {
    login(input:LoginInput): String
    reg(input:RegInput): String
  }
`

export default makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, RootMutation, customerDef, categoryDef],
  resolvers: [customerRes, categoryRes],
})
