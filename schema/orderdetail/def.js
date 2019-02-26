"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var OrderDetail = "\n  type OrderDetail {\n    id: Int\n    menuId: Int\n    modifierIds: [Int]\n    quantity: Int\n    price: Float\n  }\n  input OrderDetailInput {\n    menuId: Int\n    modifierIds: [Int]\n    quantity: Int\n    price: Float\n  }\n";
exports.default = OrderDetail;