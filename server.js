'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _apolloServerExpress = require('apollo-server-express');

var _serveStatic = require('serve-static');

var _serveStatic2 = _interopRequireDefault(_serveStatic);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This is for to run babel-parsed code with async/await
require('dotenv').config();

var APP_PORT = 8888;
var app = (0, _express2.default)();
var auth = (0, _expressJwt2.default)({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false
});

app.use((0, _serveStatic2.default)(__dirname));
app.use('/api', _bodyParser2.default.json({ limit: '5mb' }), auth, (0, _apolloServerExpress.graphqlExpress)(function (req) {
  return {
    schema: _schema2.default,
    context: {
      // can access from resolvers, for when token is attached to axios Authorization header
      loggedInUser: req.user
    }
  };
}));
app.use('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({ endpointURL: 'api' }));

app.listen(process.env.PORT || APP_PORT, function () {
  console.log('TPTEA_API listening on port ' + APP_PORT + ' ...');
});