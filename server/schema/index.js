import {makeExecutableSchema} from 'graphql-tools'

import customerDef from './customer/def'
import customerRes from './customer/res'
import categoryDef from './category/def'
import categoryRes from './category/res'
import menuDef from './menu/def'
import menuRes from './menu/res'
import modifierDef from './modifier/def'
import modifierRes from './modifier/res'
import adminDef from './admin/def'
import adminRes from './admin/res'
import giftCardDef from './giftcard/def'
import giftCardRes from './giftcard/res'
import mainCategoryDef from './maincategory/def'
import mainCategoryRes from './maincategory/res'
import orderDef from './order/def'
import orderRes from './order/res'
import orderDetailDef from './orderdetail/def'
import orderDetailRes from './orderdetail/res'
const SchemaDefinition = `
  schema {
    query: RootQuery,
    mutation: RootMutation
  }
`

const RootQuery = `
  type RootQuery {
    getCustomer(input:Int): Customer
    listCategories(input:Int): [Category]
    listMenus(input:CategoryInput): [Menu]
    fetchModifiers(input:MenuInput): [ModifierGroup]
    fetchAdmin(input:Int): Admin
    fetchCustomers: [Customer]
    fetchGiftCards: [GiftCard]
    genCustomerPaymentId(input:Int): String
    verifyCustomerPaymentId(input:String): Customer
    registerPushSubscription(input:PushSubscriptionInput): String
    fetchMainCategories:[MainCategory]
    fetchAllMenus:[Menu]
    fetchAllModifiers:[Modifier]
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
    deleteGiftCards(input:[Int]): Int
    createGiftCard(input:GiftCardInput): GiftCard
    applyGiftCard(input:ApplyGiftCardInput): ApplyGiftCardOutput
    receivePayment(input:ReceivePaymentInput): ReceivePayment
    pushMessage(input:String): String
    placeOrder(input:OrderInput): Int
    findNearestStore(input: String): Int
  }
`

export default makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, RootMutation, customerDef, categoryDef, menuDef, modifierDef, adminDef, giftCardDef, mainCategoryDef, orderDef, orderDetailDef],
  resolvers: [customerRes, categoryRes, menuRes, modifierRes, adminRes, giftCardRes, mainCategoryRes, orderRes, orderDetailRes],
})
