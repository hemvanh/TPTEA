'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = require('graphql-tools');

var _def = require('./customer/def');

var _def2 = _interopRequireDefault(_def);

var _res = require('./customer/res');

var _res2 = _interopRequireDefault(_res);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SchemaDefinition = '\n  schema {\n    query: RootQuery,\n    mutation: RootMutation\n  }\n';

var RootQuery = '\n  type RootQuery {\n    getCustomer(input:Int): Customer\n  }\n';

var RootMutation = '\n  type RootMutation {\n    login(input:LoginInput): String\n  }\n';

exports.default = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: [SchemaDefinition, RootQuery, RootMutation, _def2.default],
  resolvers: [_res2.default]
});