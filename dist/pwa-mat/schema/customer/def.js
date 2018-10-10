"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Customer = "\n  scalar Date\n  type Customer {\n    id: Int\n    username: String\n    password: String\n    name: String\n    add: String\n    phone: String\n    balance: Float\n    points: Int\n    createdAt: Date\n  }\n  input CustomerInput {\n    id: Int\n    username: String!\n    password: String\n    name: String\n    add: String\n    phone: String\n    balance: Float\n    points: Int\n  }\n  input LoginInput {\n    username: String!\n    password: String!\n  }\n  input RegInput {\n    username: String!\n    password: String!\n    passwordConfirm: String!\n    fullName: String,\n    phone: String\n    address: String\n  }\n";
exports.default = Customer;