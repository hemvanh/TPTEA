'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = require('graphql-tools');

var _def = require('./customer/def');

var _def2 = _interopRequireDefault(_def);

var _res = require('./customer/res');

var _res2 = _interopRequireDefault(_res);

var _def3 = require('./category/def');

var _def4 = _interopRequireDefault(_def3);

var _res3 = require('./category/res');

var _res4 = _interopRequireDefault(_res3);

var _def5 = require('./menu/def');

var _def6 = _interopRequireDefault(_def5);

var _res5 = require('./menu/res');

var _res6 = _interopRequireDefault(_res5);

var _def7 = require('./modifier/def');

var _def8 = _interopRequireDefault(_def7);

var _res7 = require('./modifier/res');

var _res8 = _interopRequireDefault(_res7);

var _def9 = require('./admin/def');

var _def10 = _interopRequireDefault(_def9);

var _res9 = require('./admin/res');

var _res10 = _interopRequireDefault(_res9);

var _def11 = require('./giftcard/def');

var _def12 = _interopRequireDefault(_def11);

var _res11 = require('./giftcard/res');

var _res12 = _interopRequireDefault(_res11);

var _def13 = require('./maincategory/def');

var _def14 = _interopRequireDefault(_def13);

var _res13 = require('./maincategory/res');

var _res14 = _interopRequireDefault(_res13);

var _def15 = require('./order/def');

var _def16 = _interopRequireDefault(_def15);

var _res15 = require('./order/res');

var _res16 = _interopRequireDefault(_res15);

var _def17 = require('./orderdetail/def');

var _def18 = _interopRequireDefault(_def17);

var _res17 = require('./orderdetail/res');

var _res18 = _interopRequireDefault(_res17);

var _def19 = require('./orderstatus/def');

var _def20 = _interopRequireDefault(_def19);

var _res19 = require('./orderstatus/res');

var _res20 = _interopRequireDefault(_res19);

var _def21 = require('./store/def');

var _def22 = _interopRequireDefault(_def21);

var _res21 = require('./store/res');

var _res22 = _interopRequireDefault(_res21);

var _def23 = require('./customer-order/def');

var _def24 = _interopRequireDefault(_def23);

var _res23 = require('./customer-order/res');

var _res24 = _interopRequireDefault(_res23);

var _def25 = require('./ordersystem/def');

var _def26 = _interopRequireDefault(_def25);

var _res25 = require('./ordersystem/res');

var _res26 = _interopRequireDefault(_res25);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SchemaDefinition = '\n  schema {\n    query: RootQuery,\n    mutation: RootMutation\n  }\n';

var RootQuery = '\n  type RootQuery {\n    getCustomer(input:Int): Customer\n    listCategories(input:Int): [Category]\n    listMenus(input:Int): [Menu]\n    fetchModifiers(input:MenuInput): [ModifierGroup]\n    fetchAdmin(input:Int): Admin\n    fetchCustomers: [Customer]\n    fetchGiftCards: [GiftCard]\n    genCustomerPaymentId(input:Int): String\n    verifyCustomerPaymentId(input:String): Customer\n    registerPushSubscription(input:PushSubscriptionInput): String\n    fetchMainCategories:[MainCategory]\n    fetchAllMenus:[Menu]\n    fetchAllModifiers:[Modifier]\n    fetchAdminModifiers:[AdminModifier]\n    fetchAllStores:[Store]\n    fetchCustomerOrders(input:Int):[CustomerOrder]\n    fetchOrders:[Order]\n    fetchOrdersByStoreId(input:Int):[Order]\n    fetchCustomerOrderDetail(input:Int):HistoryCustomerOrder\n    fetchOrderStatuses:[OrderStatus]\n    fetchAllCategoriesAdmin:[Category]\n    fetchOrderSystemData: OrderSystemData\n  }\n';

var RootMutation = '\n  type RootMutation {\n    login(input:LoginInput): String\n    register(input:RegisterInput): String\n    loginFb(input:LoginInput): String\n    registerFb(input:RegisterInput): RegisterFbResponse\n    loginAdmin(input:AdminLoginInput): String\n    deleteCustomers(input:[Int]): Int\n    updateCustomer(input:CustomerInput): Customer\n    createCustomer(input:CustomerInput): Customer\n    genGiftCard(input:GenGiftCardInput): String\n    deleteGiftCards(input:[Int]): Int\n    createGiftCard(input:GiftCardInput): GiftCard\n    applyGiftCard(input:ApplyGiftCardInput): ApplyGiftCardOutput\n    receivePayment(input:ReceivePaymentInput): ReceivePayment\n    pushMessage(input:String): String\n    placeOrder(input:OrderInput): Int\n    updateOrderStatus(input: UpdateOrderStatusInput) : Int    \n    createAdminModifier(input : AdminModifierInput): AdminModifier\n    updateAdminModifier(input : AdminModifierInput): AdminModifier\n    deleteAdminModifiers(input:[Int]): Int\n    createCategory(input:CategoryInput): Category\n    deleteCategories(input:[Int]): Int\n    updateCategory(input:CategoryInput): Category\n    createMenu(input:MenuInput): Menu\n    deleteMenus(input:[Int]): Int\n    updateMenu(input:MenuInput): Menu\n    payNow(input: Int): PayNowOutput\n  }\n';

exports.default = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: [SchemaDefinition, RootQuery, RootMutation, _def2.default, _def4.default, _def6.default, _def8.default, _def10.default, _def12.default, _def14.default, _def16.default, _def18.default, _def20.default, _def22.default, _def24.default, _def26.default],
  resolvers: [_res2.default, _res4.default, _res6.default, _res8.default, _res10.default, _res12.default, _res14.default, _res16.default, _res18.default, _res20.default, _res22.default, _res24.default, _res26.default]
});