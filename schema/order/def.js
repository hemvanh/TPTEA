"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Order = "\n  type PlaceOrderMethod {\n    storeId: Int\n    isStorePickUp: Boolean\n    receivingTime: Date\n    deliveryAddress: String\n    deliveryContact: String\n  }\n  input PlaceOrderMethodInput {\n    storeId: Int\n    isStorePickUp: Boolean\n    receivingTime: Date\n    deliveryAddress: String\n    deliveryContact: String\n  }\n  type Order {\n    id: Int\n    isStorePickUp: Boolean\n    receivingTime: Date\n    deliveryAddress: String\n    deliveryContact: String\n    totalAmount: Float\n    orderStatusId: Int\n    Store : Store\n    Customer: Customer\n    OrderStatus: OrderStatus\n    OrderDetails: [OrderDetail]\n    createdAt: Date\n  }\n  input OrderInput {\n    customerId: Int!\n    placeOrderMethod: PlaceOrderMethodInput\n    orderDetails: [OrderDetailInput]\n  }\n  input UpdateOrderStatusInput {\n    orderId: Int!\n    orderStatusId: Int!\n  }\n  type HistoryPlaceOrderMethod {\n    storeId: Int\n    isStorePickUp: Boolean\n    receivingTime: Date\n    address: String\n    deliveryContact: String\n  }\n";
exports.default = Order;