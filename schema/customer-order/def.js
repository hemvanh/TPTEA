"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CustomerOrder = "\n  type CustomerOrder {\n    id: Int\n    address: String\n    orderDate: Date\n    orderStatus: String\n    totalAmount: String\n    isStorePickUp: Boolean\n  }\n  type HistoryCustomerOrder {\n    placeOrderMethod: HistoryPlaceOrderMethod\n    customerOrder:[OrderDetail]\n  }\n";
exports.default = CustomerOrder;