'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _graphqlDate = require('graphql-date');

var _graphqlDate2 = _interopRequireDefault(_graphqlDate);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _util = require('../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var SALT = 10;

var resolvers = {
  Date: _graphqlDate2.default,
  RootQuery: {
    getCustomer: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref, _ref2) {
        var input = _ref.input;
        var authCustomer = _ref2.authCustomer;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (0, _util._auth)(authCustomer);
                _context.next = 3;
                return _models.Customer.findOne({ where: { id: input } });

              case 3:
                return _context.abrupt('return', _context.sent);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getCustomer(_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      }

      return getCustomer;
    }()
  },
  RootMutation: {
    login: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref4) {
        var input = _ref4.input;
        var user, valid;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _models.Customer.findOne({ where: { username: input.username } });

              case 2:
                user = _context2.sent;

                if (user) {
                  _context2.next = 5;
                  break;
                }

                throw new Error('Account not found!');

              case 5:
                _context2.next = 7;
                return _bcrypt2.default.compare(input.password, user.password);

              case 7:
                valid = _context2.sent;

                if (valid) {
                  _context2.next = 10;
                  break;
                }

                throw new Error('Wrong Password ...');

              case 10:
                return _context2.abrupt('return', _jsonwebtoken2.default.sign({
                  username: user.username,
                  name: user.name,
                  add: user.add,
                  phone: user.phone,
                  balance: user.balance,
                  points: user.points
                }, process.env.JWT_SECRET, { expiresIn: '1y' }));

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function login(_x4, _x5) {
        return _ref5.apply(this, arguments);
      }

      return login;
    }(),
    reg: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref6) {
        var input = _ref6.input;
        var user;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _models.Customer.findOne({ where: { username: input.username } });

              case 2:
                user = _context4.sent;

                if (!user) {
                  _context4.next = 5;
                  break;
                }

                throw new Error('Account is existed!');

              case 5:
                input.password = _bcrypt2.default.hashSync(input.password, SALT);
                _context4.next = 8;
                return _models.Customer.upsert(input).then(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return _models.Customer.findOne({ where: { username: input.username } });

                        case 2:
                          user = _context3.sent;
                          return _context3.abrupt('return', _jsonwebtoken2.default.sign({
                            id: user.id,
                            username: user.username,
                            name: user.name,
                            add: user.add,
                            phone: user.phone,
                            balance: user.balance,
                            points: user.points
                          }, process.env.JWT_SECRET, { expiresIn: '1y' }));

                        case 4:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  }, _callee3, this);
                })));

              case 8:
                return _context4.abrupt('return', _context4.sent);

              case 9:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function reg(_x6, _x7) {
        return _ref7.apply(this, arguments);
      }

      return reg;
    }()
  }
};

exports.default = resolvers;