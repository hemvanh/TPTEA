"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Customer = "\n  scalar Date\n  type Customer {\n    id: Int\n    username: String\n    password: String\n    name: String\n    address: String\n    phone: String\n    balance: Float\n    points: Int\n    createdAt: Date\n  }\n  input CustomerInput {\n    id: Int\n    username: String!\n    password: String\n    name: String\n    address: String\n    phone: String\n    balance: Float\n    points: Int\n  }\n  input LoginInput {\n    username: String!\n    password: String!\n    type: String\n  }\n  input RegisterInput {\n    username: String!\n    password: String!\n    passwordConfirm: String!\n    name: String,\n    phone: String\n    address: String\n    type: String\n  }\n  type RegisterFbResponse {\n    token :String\n    msg: String\n  }\n\n  input ApplyGiftCardInput {\n    jwt: String!\n    customerId: Int!\n  }\n  type ApplyGiftCardOutput {\n    balance: Float\n    amount: Int\n  }\n  input PushSubscriptionInput {\n    endpoint: String\n    auth: String\n    p256dh: String\n  }\n";
exports.default = Customer;