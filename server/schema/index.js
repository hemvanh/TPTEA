import {makeExecutableSchema} from 'graphql-tools'

import customerDef from './customer/def'
import customerRes from './customer/res'
import categoryDef from './category/def'
import categoryRes from './category/res'
import menuDef from './menu/def'
import menuRes from './menu/res'

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
    listMenus(input:CategoryInput): [Menu]
  }
`

const RootMutation = `
  type RootMutation {
    login(input:LoginInput): String
    reg(input:RegInput): String
  }
`

export default makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, RootMutation, customerDef, categoryDef, menuDef],
  resolvers: [customerRes, categoryRes, menuRes],
})
