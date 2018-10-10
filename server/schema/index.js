import {makeExecutableSchema} from 'graphql-tools'

import customerDef from './customer/def'
import customerRes from './customer/res'
import categoryDef from './category/def'
import categoryRes from './category/res'
import menuDef from './menu/def'
import menuRes from './menu/res'
import modifyDef from './modify/def'
import modifyRes from './modify/res'

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
    fetchModifiers(input:MenuInput): [Modify]
  }
`

const RootMutation = `
  type RootMutation {
    login(input:LoginInput): String
    register(input:RegisterInput): String
    loginFb(input:LoginInput): String
    registerFb(input:RegisterInput): RegisterFbResponse
  }
`

export default makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, RootMutation, customerDef, categoryDef, menuDef, modifyDef],
  resolvers: [customerRes, categoryRes, menuRes, modifyRes],
})
