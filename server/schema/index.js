import {makeExecutableSchema} from 'graphql-tools'

import customerDef from './customer/def'
import customerRes from './customer/res'
import categoryDef from './category/def'
import categoryRes from './category/res'
import menuDef from './menu/def'
import menuRes from './menu/res'
import modifyDef from './modify/def'
import modifyRes from './modify/res'
import adminDef from './admin/def'
import adminRes from './admin/res'
import giftCardDef from './giftcard/def'
import giftCardRes from './giftcard/res'

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
    fetchAdmin(input:Int): Admin
    fetchCustomers: [Customer]
    fetchGiftCards: [GiftCard]
  }
`

const RootMutation = `
  type RootMutation {
    login(input:LoginInput): String
    register(input:RegisterInput): String
    loginFb(input:LoginInput): String
    registerFb(input:RegisterInput): RegisterFbResponse
    loginAdmin(input:AdminLoginInput): String
    deleteCustomers(input:[Int]): Int
    updateCustomer(input:CustomerInput): Customer
    createCustomer(input:CustomerInput): Customer
    genGiftCard(input:GenGiftCardInput): String
    deleteGiftCard(input:[Int]): Int
    createGiftCard(input:GiftCardInput): GiftCard
    applyGiftCard(input:ApplyGiftCardInput): Int
  }
`

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    RootQuery,
    RootMutation,
    customerDef,
    categoryDef,
    menuDef,
    modifyDef,
    adminDef,
    giftCardDef,
  ],
  resolvers: [customerRes, categoryRes, menuRes, modifyRes, adminRes, giftCardRes],
})
