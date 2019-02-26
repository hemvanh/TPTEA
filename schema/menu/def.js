"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Menu = "\n  type Menu {\n    id: Int\n    name: String\n    price: String\n    desc: String\n    img: String\n    categoryId: Int\n    mainCategoryId: Int\n    modifierIds: [Int]\n  }\n  input MenuInput {\n    id: Int\n    name: String!\n    price: String!\n    desc: String\n    img: String\n    categoryId: Int\n    modifierIds: [Int]\n  }\n";
exports.default = Menu;