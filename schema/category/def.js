"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Category = "\n  type Category {\n    id: Int\n    name: String\n    desc: String\n    img: String\n    mainCategoryName: String\n    mainCategoryId: Int\n  }\n  input CategoryInput {\n    id: Int\n    name: String\n    desc: String\n    img: String\n    mainCategoryId: Int\n  }\n";
exports.default = Category;