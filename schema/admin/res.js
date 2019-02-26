'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _util = require('../../util');

var _webPush = require('web-push');

var _webPush2 = _interopRequireDefault(_webPush);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var endPointUrlExpired = [];
var pushMsg = function pushMsg(_ref, dataToSend) {
  var endpoint = _ref.endpoint,
      p256dh = _ref.p256dh,
      auth = _ref.auth,
      id = _ref.id;

  var options = {
    gcmAPIKey: process.env.FCM_API_KEY,
    TTL: 60
  };
  var pushSubscription = {
    endpoint: endpoint,
    keys: {
      p256dh: p256dh,
      auth: auth
    }
  };
  return _webPush2.default.sendNotification(pushSubscription, dataToSend, options).catch(function (_ref2) {
    var statusCode = _ref2.statusCode;

    if (statusCode === 410) {
      endPointUrlExpired.push(id);
    }
  });
};
var resolvers = {
  RootQuery: {
    fetchAdmin: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, __, _ref3) {
        var loggedInUser = _ref3.loggedInUser;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (0, _util._authAdmin)(loggedInUser);
                _context.next = 3;
                return _models.Admin.findById(loggedInUser.id);

              case 3:
                return _context.abrupt('return', _context.sent);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchAdmin(_x, _x2, _x3) {
        return _ref4.apply(this, arguments);
      }

      return fetchAdmin;
    }()
  },
  RootMutation: {
    loginAdmin: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref5) {
        var input = _ref5.input;
        var admin, valid;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _models.Admin.findOne({ where: { username: input.username } });

              case 2:
                admin = _context2.sent;

                if (admin) {
                  _context2.next = 5;
                  break;
                }

                throw new Error('Admin account not found. Please try again!');

              case 5:
                _context2.next = 7;
                return _bcrypt2.default.compare(input.password, admin.password);

              case 7:
                valid = _context2.sent;

                if (valid) {
                  _context2.next = 10;
                  break;
                }

                throw new Error('Wrong Admin Password ...');

              case 10:
                return _context2.abrupt('return', _jsonwebtoken2.default.sign({
                  id: admin.id,
                  username: admin.username,
                  roles: admin.roles
                }, process.env.JWT_SECRET, { expiresIn: '1y' }) + 'a');

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loginAdmin(_x4, _x5) {
        return _ref6.apply(this, arguments);
      }

      return loginAdmin;
    }(),
    receivePayment: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref7, _ref8) {
        var input = _ref7.input;
        var loggedInUser = _ref8.loggedInUser;
        var amount, jwtPayment, user, balance;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                (0, _util._authAdmin)(loggedInUser);
                amount = input.amount, jwtPayment = input.jwtPayment;
                _context3.next = 4;
                return (0, _util.verifyCustomerPaymentId)(jwtPayment);

              case 4:
                user = _context3.sent;
                balance = user.get('balance');

                if (!(balance < amount)) {
                  _context3.next = 10;
                  break;
                }

                throw new Error('Customer`s Balance is not enough!');

              case 10:
                _context3.next = 12;
                return user.update({ balance: balance - amount }).then(function (_ref10) {
                  var balance = _ref10.balance,
                      username = _ref10.username;

                  return { balance: balance, username: username, chargedAmount: amount };
                });

              case 12:
                return _context3.abrupt('return', _context3.sent);

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function receivePayment(_x6, _x7, _x8) {
        return _ref9.apply(this, arguments);
      }

      return receivePayment;
    }(),
    pushMessage: function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref11, _ref12) {
        var input = _ref11.input;
        var loggedInUser = _ref12.loggedInUser;
        var data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                (0, _util._authAdmin)(loggedInUser);
                _context4.next = 3;
                return _models.PushSubscription.findAll();

              case 3:
                data = _context4.sent;
                _context4.next = 6;
                return Promise.all(data.map(function (subscription) {
                  return pushMsg(subscription, input);
                }));

              case 6:
                if (!endPointUrlExpired.length) {
                  _context4.next = 12;
                  break;
                }

                _context4.next = 9;
                return _models.PushSubscription.destroy({
                  where: {
                    id: {
                      $in: endPointUrlExpired
                    }
                  }
                }).then(function () {
                  endPointUrlExpired = [];
                  return 'Success';
                });

              case 9:
                return _context4.abrupt('return', _context4.sent);

              case 12:
                return _context4.abrupt('return', 'Success');

              case 13:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function pushMessage(_x9, _x10, _x11) {
        return _ref13.apply(this, arguments);
      }

      return pushMessage;
    }()
  }
};
exports.default = resolvers;