"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Modifier = "\n  type ModifierGroup {\n    data: [Modifier]\n    groupTitle: String\n    groupType: String\n  }\n  type Modifier {\n    id: Int\n    name: String\n    price: String\n    isDefault: Boolean\n    groupType: String\n    groupTitle: String\n  }\n  type AdminModifier {\n    id: Int\n    name: String\n    price: String\n    isDefault: Boolean\n    groupType: String\n    groupTitle: String\n  }\n  input AdminModifierInput {\n    id : Int\n    name: String!\n    price: String!\n    isDefault: Boolean!\n    groupType: String!\n    groupTitle: String!\n  }\n  type MenuModifier {\n    id: Int\n    menuId: Int\n    modifierId: Int\n  }\n";
exports.default = Modifier;