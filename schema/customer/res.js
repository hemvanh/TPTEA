'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var generateLoginJwt = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var username = _ref.username;
    var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var user, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models.Customer.findOne({ where: { username: username } });

          case 2:
            user = _context.sent;
            token = _jsonwebtoken2.default.sign({
              id: user.id,
              username: user.username,
              name: user.name,
              address: user.address,
              phone: user.phone,
              balance: user.balance,
              points: user.points
            }, process.env.JWT_SECRET, { expiresIn: '1y' }) + 'c';
            return _context.abrupt('return', msg === '' ? token : { token: token, msg: msg });

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function generateLoginJwt(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

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
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, __, _ref3) {
        var loggedInUser = _ref3.loggedInUser;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                (0, _util._auth)(loggedInUser);
                _context2.next = 3;
                return _models.Customer.findById(loggedInUser.id);

              case 3:
                return _context2.abrupt('return', _context2.sent);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getCustomer(_x3, _x4, _x5) {
        return _ref4.apply(this, arguments);
      }

      return getCustomer;
    }(),
    fetchCustomers: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, __, _ref5) {
        var loggedInUser = _ref5.loggedInUser;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                (0, _util._authAdmin)(loggedInUser);
                _context3.next = 3;
                return _models.Customer.findAll();

              case 3:
                return _context3.abrupt('return', _context3.sent);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function fetchCustomers(_x6, _x7, _x8) {
        return _ref6.apply(this, arguments);
      }

      return fetchCustomers;
    }(),
    genCustomerPaymentId: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref7, _ref8) {
        var input = _ref7.input;
        var loggedInUser = _ref8.loggedInUser;
        var user;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                (0, _util._auth)(loggedInUser);
                _context4.next = 3;
                return _models.Customer.findById(input);

              case 3:
                user = _context4.sent;

                if (!user) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt('return', _jsonwebtoken2.default.sign(input + '_' + new Date().getTime(), process.env.JWT_SECRET));

              case 8:
                throw new Error('Customer not found!');

              case 9:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function genCustomerPaymentId(_x9, _x10, _x11) {
        return _ref9.apply(this, arguments);
      }

      return genCustomerPaymentId;
    }(),
    registerPushSubscription: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref10) {
        var input = _ref10.input;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _models.PushSubscription.create(input).then(function () {
                  return 'Create Success';
                });

              case 2:
                return _context5.abrupt('return', _context5.sent);

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function registerPushSubscription(_x12, _x13) {
        return _ref11.apply(this, arguments);
      }

      return registerPushSubscription;
    }()
  },
  RootMutation: {
    login: function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, _ref12) {
        var input = _ref12.input;
        var user, valid;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _models.Customer.findOne({ where: { username: input.username } });

              case 2:
                user = _context6.sent;

                if (user) {
                  _context6.next = 5;
                  break;
                }

                throw new Error('Account not found. Please try again!');

              case 5:
                _context6.next = 7;
                return _bcrypt2.default.compare(input.password, user.password);

              case 7:
                valid = _context6.sent;

                if (valid) {
                  _context6.next = 10;
                  break;
                }

                throw new Error('Wrong Password ...');

              case 10:
                return _context6.abrupt('return', generateLoginJwt(input));

              case 11:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function login(_x14, _x15) {
        return _ref13.apply(this, arguments);
      }

      return login;
    }(),
    register: function () {
      var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_, _ref14) {
        var _this = this;

        var input = _ref14.input;
        var user;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _models.Customer.findOne({ where: { username: input.username, type: input.type } });

              case 2:
                user = _context8.sent;

                if (!user) {
                  _context8.next = 5;
                  break;
                }

                throw new Error('Account is existed!');

              case 5:
                input.password = _bcrypt2.default.hashSync(input.password, SALT);
                _context8.next = 8;
                return _models.Customer.upsert(input).then(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                  return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          _context7.next = 2;
                          return generateLoginJwt(input);

                        case 2:
                          return _context7.abrupt('return', _context7.sent);

                        case 3:
                        case 'end':
                          return _context7.stop();
                      }
                    }
                  }, _callee7, _this);
                })));

              case 8:
                return _context8.abrupt('return', _context8.sent);

              case 9:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function register(_x16, _x17) {
        return _ref15.apply(this, arguments);
      }

      return register;
    }(),
    loginFb: function () {
      var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_, _ref17) {
        var input = _ref17.input;
        var user;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return _models.Customer.findOne({ where: { username: input.username } });

              case 2:
                user = _context9.sent;

                if (user) {
                  _context9.next = 5;
                  break;
                }

                throw new Error('Account not found. Please Register by Facebook First!');

              case 5:
                return _context9.abrupt('return', generateLoginJwt(input));

              case 6:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function loginFb(_x18, _x19) {
        return _ref18.apply(this, arguments);
      }

      return loginFb;
    }(),
    registerFb: function () {
      var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(_, _ref19) {
        var _this2 = this;

        var input = _ref19.input;
        var user, msgRes;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return _models.Customer.findOne({ where: { username: input.username, type: input.type } });

              case 2:
                user = _context11.sent;
                msgRes = '';

                if (user) {
                  msgRes = 'Account is existed!';
                  input.id = user.id;
                } else {
                  msgRes = 'Regitered Successfully!';
                }
                _context11.next = 7;
                return _models.Customer.upsert(input).then(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                  return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                      switch (_context10.prev = _context10.next) {
                        case 0:
                          return _context10.abrupt('return', generateLoginJwt(input, msgRes));

                        case 1:
                        case 'end':
                          return _context10.stop();
                      }
                    }
                  }, _callee10, _this2);
                })));

              case 7:
                return _context11.abrupt('return', _context11.sent);

              case 8:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function registerFb(_x20, _x21) {
        return _ref20.apply(this, arguments);
      }

      return registerFb;
    }(),
    deleteCustomers: function () {
      var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(_, _ref22, _ref23) {
        var input = _ref22.input;
        var loggedInUser = _ref23.loggedInUser;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                (0, _util._authAdmin)(loggedInUser);
                _context12.next = 3;
                return _models.Customer.destroy({
                  where: {
                    id: {
                      $in: input
                    }
                  }
                });

              case 3:
                return _context12.abrupt('return', _context12.sent);

              case 4:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function deleteCustomers(_x22, _x23, _x24) {
        return _ref24.apply(this, arguments);
      }

      return deleteCustomers;
    }(),
    updateCustomer: function () {
      var _ref27 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(_, _ref25, _ref26) {
        var input = _ref25.input;
        var loggedInUser = _ref26.loggedInUser;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                (0, _util._authAdmin)(loggedInUser);
                if (input.password !== '') {
                  input.password = _bcrypt2.default.hashSync(input.password, SALT);
                } else {
                  delete input.password;
                }
                _context13.next = 4;
                return _models.Customer.update(input, {
                  where: {
                    id: input.id
                  }
                }).then(function () {
                  return input;
                });

              case 4:
                return _context13.abrupt('return', _context13.sent);

              case 5:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function updateCustomer(_x25, _x26, _x27) {
        return _ref27.apply(this, arguments);
      }

      return updateCustomer;
    }(),
    createCustomer: function () {
      var _ref30 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(_, _ref28, _ref29) {
        var input = _ref28.input;
        var loggedInUser = _ref29.loggedInUser;
        var user;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                (0, _util._authAdmin)(loggedInUser);
                _context14.next = 3;
                return _models.Customer.findOne({ where: { username: input.username } });

              case 3:
                user = _context14.sent;

                if (!user) {
                  _context14.next = 6;
                  break;
                }

                throw new Error('Account is existed!');

              case 6:
                input.type = 'password';
                input.password = _bcrypt2.default.hashSync(input.password, SALT);
                _context14.next = 10;
                return _models.Customer.create(input).then(function (customer) {
                  return customer;
                });

              case 10:
                return _context14.abrupt('return', _context14.sent);

              case 11:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function createCustomer(_x28, _x29, _x30) {
        return _ref30.apply(this, arguments);
      }

      return createCustomer;
    }(),
    applyGiftCard: function () {
      var _ref33 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(_, _ref31, _ref32) {
        var _this3 = this;

        var input = _ref31.input;
        var loggedInUser = _ref32.loggedInUser;

        var _ref34, giftCard, expired, user, amount, balance;

        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                _context16.prev = 0;

                (0, _util._auth)(loggedInUser);
                _context16.next = 4;
                return (0, _util.authGiftCard)(input.jwt);

              case 4:
                _ref34 = _context16.sent;
                giftCard = _ref34.giftCard;
                expired = _ref34.expired;

                if (!expired) {
                  _context16.next = 9;
                  break;
                }

                throw new Error('This gift card has expired!');

              case 9:
                if (!giftCard.customerId) {
                  _context16.next = 11;
                  break;
                }

                throw new Error('The gift card is not available anymore!');

              case 11:
                _context16.next = 13;
                return _models.Customer.findById(input.customerId);

              case 13:
                user = _context16.sent;

                if (!user) {
                  _context16.next = 22;
                  break;
                }

                amount = giftCard.amount;
                balance = user.get('balance') + amount;
                _context16.next = 19;
                return user.update({ balance: balance }).then(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
                  return regeneratorRuntime.wrap(function _callee15$(_context15) {
                    while (1) {
                      switch (_context15.prev = _context15.next) {
                        case 0:
                          _context15.next = 2;
                          return giftCard.update({ customerId: input.customerId }).then(function () {
                            return { balance: balance, amount: amount };
                          });

                        case 2:
                          return _context15.abrupt('return', _context15.sent);

                        case 3:
                        case 'end':
                          return _context15.stop();
                      }
                    }
                  }, _callee15, _this3);
                })));

              case 19:
                return _context16.abrupt('return', _context16.sent);

              case 22:
                throw new Error('Customer info Not Found!');

              case 23:
                _context16.next = 28;
                break;

              case 25:
                _context16.prev = 25;
                _context16.t0 = _context16['catch'](0);
                throw new Error(_context16.t0.message);

              case 28:
              case 'end':
                return _context16.stop();
            }
          }
        }, _callee16, this, [[0, 25]]);
      }));

      function applyGiftCard(_x31, _x32, _x33) {
        return _ref33.apply(this, arguments);
      }

      return applyGiftCard;
    }()
  }
};

exports.default = resolvers;