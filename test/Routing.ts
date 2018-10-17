import {ClientFunction} from 'testcafe'

const setLocalStorageItem = ClientFunction((prop, value) => {
  localStorage.setItem(prop, value)
})
const getLocalStorageItem = ClientFunction(prop => {
  return localStorage.getItem(prop)
})
const CUSTOMER_TOKEN = 'c'
const ADMIN_TOKEN = 'a'
const URL_PREFIX = 'http://localhost:8080/#/'
var log = console.log

const TEST_CASES = {
  noToken: {
    customerRouting: [
      {navTo: '#/', navExpect: ''},
      {navTo: '#//', navExpect: ''},
      {navTo: '#//s`2qgfh', navExpect: ''},
      {navTo: '#/customer', navExpect: 'customer/login'},
      {navTo: '#/customer/', navExpect: 'customer/login'},
      {navTo: '#/customer/admin', navExpect: 'customer/login'},
      {navTo: '#/customer/login', navExpect: 'customer/login'},
      {navTo: '#/customer/login/', navExpect: 'customer/login'},
      {navTo: '#/customer/settings', navExpect: 'customer/login'},
      {navTo: '#/customer/register', navExpect: 'customer/register'},
      {navTo: '#/customer/register/', navExpect: 'customer/register'},
      {navTo: '#/categories', navExpect: '/categories'},
    ],
    adminRouting: [
      {navTo: '#/admin', navExpect: 'admin/login'},
      {navTo: '#/admin/', navExpect: 'admin/login'},
      {navTo: '#/admin/login', navExpect: 'admin/login'},
      {navTo: '#/admin/customers', navExpect: 'admin/login'},
      {navTo: '#/admin/settings', navExpect: 'admin/login'},
      {navTo: '#/admin/register', navExpect: 'admin/login'},
      {navTo: '#/admin/categories', navExpect: 'admin/login'},
    ],
  },
  customerToken: {
    customerRouting: [
      {navTo: '#/', navExpect: ''},
      {navTo: '#/customer', navExpect: 'customer'},
      {navTo: '#/customer/', navExpect: 'customer/'},
      {navTo: '#/customer/login', navExpect: 'customer'},
      {navTo: '#/customer/settings', navExpect: 'customer/settings'},
      {navTo: '#/customer/register', navExpect: 'customer'},
      {navTo: '#/categories', navExpect: 'categories'},
    ],
    adminRouting: [
      {navTo: '#/admin', navExpect: 'customer'},
      {navTo: '#/admin/', navExpect: 'customer'},
      {navTo: '#/admin/login', navExpect: 'customer'},
      {navTo: '#/admin/settings', navExpect: 'customer'},
      {navTo: '#/admin/customers', navExpect: 'customer'},
    ],
  },
  adminToken: {
    customerRouting: [
      // {navTo: '#/', navExpect: 'admin'},
      {navTo: '#/customer', navExpect: 'admin'},
      {navTo: '#/customer/', navExpect: 'admin/'},
      {navTo: '#/customer/login', navExpect: 'admin'},
      {navTo: '#/customer/settings', navExpect: 'admin'},
      {navTo: '#/customer/register', navExpect: 'admin'},
      {navTo: '#/categories', navExpect: 'admin'},
    ],
    adminRouting: [
      {navTo: '#/admin', navExpect: 'admin'},
      {navTo: '#/admin/', navExpect: 'admin/'},
      {navTo: '#/admin/login', navExpect: 'admin'},
      {navTo: '#/admin/settings', navExpect: 'admin/settings'},
      {navTo: '#/admin/customers', navExpect: 'admin/customers'},
    ],
  },
}
var testRoute = function(navTo, navExpect) {
  return async function(t) {
    const getLocation = ClientFunction(() => document.location.href)
    await t.navigateTo(navTo)
    await t.expect(getLocation()).contains(navExpect)
  }
}
var testRouteToken = function(navTo, navExpect, token) {
  return async function(t) {
    await t.setTestSpeed(0.4)
    const getLocation = ClientFunction(() => document.location.href)
    await setLocalStorageItem('auth-token', token)
    await t.navigateTo(navTo)
    await t.expect(getLocation()).eql(URL_PREFIX + navExpect)
  }
}

async function testCase(nav, navIndex) {
  test(
    `[${navIndex}] Check if ${nav.navTo} -> ${nav.navExpect == '' ? '/' : nav.navExpect}`,
    testRoute(nav.navTo, nav.navExpect)
  )
}
async function testCaseToken(nav, navIndex, token) {
  //log(token)
  //log(nav)
  test(
    `[${navIndex}] Check if ${nav.navTo} -> ${nav.navExpect == '' ? '/' : nav.navExpect}`,
    testRouteToken(nav.navTo, nav.navExpect, token)
  )
}

// // ================== TEST_CASES.noToken ==================== //
// fixture`NoToken-Customer-Routing`.page`http://localhost:8080/#/`
// TEST_CASES.noToken.customerRouting.forEach((nav, index) => {
//   testCase(nav, index)
// })
// fixture`NoToken-Admin-Routing`.page`http://localhost:8080/#/`
// TEST_CASES.noToken.adminRouting.forEach((nav, index) => {
//   testCase(nav, index)
// })

// // ================== TEST_CASE.customerToken =============== //
// fixture`CustomerToken-Customer-Routing`.page`http://localhost:8080/#/`
// TEST_CASES.customerToken.customerRouting.forEach((nav, index) => {
//   testCaseToken(nav, index, CUSTOMER_TOKEN)
// })
// fixture`CustomerToken-Admin-Routing`.page`http://localhost:8080/#/`
// TEST_CASES.customerToken.adminRouting.forEach((nav, index) => {
//   testCaseToken(nav, index, CUSTOMER_TOKEN)
// })

// ================== TEST_CASE.adminToken =============== //
fixture`AdminToken-Customer-Routing`.page`http://localhost:8080/#/`
TEST_CASES.adminToken.customerRouting.forEach((nav, index) => {
  if (index === 2) testCaseToken(nav, index, ADMIN_TOKEN)
})
// fixture`AdminToken-Admin-Routing`.page`http://localhost:8080/#/`
// TEST_CASES.adminToken.adminRouting.forEach((nav, index) => {
//   testCaseToken(nav, index, ADMIN_TOKEN)
// })
