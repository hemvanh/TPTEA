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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SchemaDefinition = '\n  schema {\n    query: RootQuery,\n    mutation: RootMutation\n  }\n';

var RootQuery = '\n  type RootQuery {\n    getCustomer(input:Int): Customer\n    listCategories: [Category]\n    listMenus(input:CategoryInput): [Menu]\n  }\n';

var RootMutation = '\n  type RootMutation {\n    login(input:LoginInput): String\n    reg(input:RegInput): String\n  }\n';

exports.default = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: [SchemaDefinition, RootQuery, RootMutation, _def2.default, _def4.default, _def6.default],
  resolvers: [_res2.default, _res4.default, _res6.default]
});