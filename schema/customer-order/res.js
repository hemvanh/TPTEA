'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('../../util');

var _models = require('../../models');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var PAID_ORDER_STATUS_ID = 2;
var PROCESSING_ORDER_STATUS_ID = 1;
var resolvers = {
  RootQuery: {
    fetchCustomerOrders: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref, _ref2) {
        var input = _ref.input;
        var loggedInUser = _ref2.loggedInUser;
        var customer;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                (0, _util._auth)(loggedInUser);
                customer = new _models.Customer({ id: input });
                _context.next = 4;
                return customer.getOrders({ order: [['createdAt', 'DESC']] });

              case 4:
                return _context.abrupt('return', _context.sent);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchCustomerOrders(_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      }

      return fetchCustomerOrders;
    }(),
    fetchCustomerOrderDetail: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, _ref4, _ref5) {
        var input = _ref4.input;
        var loggedInUser = _ref5.loggedInUser;
        var order, customerOrder;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                (0, _util._auth)(loggedInUser);
                _context2.next = 3;
                return _models.Order.findOne({ where: { id: input } });

              case 3:
                order = _context2.sent;
                _context2.next = 6;
                return order.getOrderDetails();

              case 6:
                customerOrder = _context2.sent;
                return _context2.abrupt('return', {
                  placeOrderMethod: order,
                  customerOrder: customerOrder
                });

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchCustomerOrderDetail(_x4, _x5, _x6) {
        return _ref6.apply(this, arguments);
      }

      return fetchCustomerOrderDetail;
    }()
  },
  RootMutation: {
    payNow: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref7, _ref8) {
        var _this = this;

        var input = _ref7.input;
        var loggedInUser = _ref8.loggedInUser;
        var order, totalAmount, customer, balance;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                (0, _util._auth)(loggedInUser);
                _context5.prev = 1;
                _context5.next = 4;
                return _models.Order.findOne({ where: { id: input } });

              case 4:
                order = _context5.sent;
                totalAmount = order.get('totalAmount');
                _context5.next = 8;
                return _models.Customer.findOne({ where: { id: order.get('customerId') } });

              case 8:
                customer = _context5.sent;
                balance = customer.get('balance');

                if (!(order.orderStatusId !== PROCESSING_ORDER_STATUS_ID)) {
                  _context5.next = 14;
                  break;
                }

                throw new Error('This order was paid');

              case 14:
                if (!(balance < totalAmount)) {
                  _context5.next = 18;
                  break;
                }

                throw new Error('The balance does not enough to pay this order');

              case 18:
                balance = parseFloat(balance - totalAmount);
                return _context5.abrupt('return', _models.sequelize.transaction(function () {
                  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(t) {
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return customer.updateAttributes({
                              balance: balance
                            });

                          case 2:
                          case 'end':
                            return _context3.stop();
                        }
                      }
                    }, _callee3, _this);
                  }));

                  return function (_x10) {
                    return _ref10.apply(this, arguments);
                  };
                }()).then(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.next = 2;
                          return order.updateAttributes({
                            orderStatusId: PAID_ORDER_STATUS_ID
                          });

                        case 2:
                          return _context4.abrupt('return', { totalAmount: totalAmount, balance: balance });

                        case 3:
                        case 'end':
                          return _context4.stop();
                      }
                    }
                  }, _callee4, _this);
                }))).catch(function (err) {
                  throw new Error(err);
                }));

              case 20:
                _context5.next = 25;
                break;

              case 22:
                _context5.prev = 22;
                _context5.t0 = _context5['catch'](1);
                throw new Error(_context5.t0.message);

              case 25:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 22]]);
      }));

      function payNow(_x7, _x8, _x9) {
        return _ref9.apply(this, arguments);
      }

      return payNow;
    }()
  },
  CustomerOrder: {
    address: function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(customerorder) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!customerorder.isStorePickUp) {
                  _context6.next = 6;
                  break;
                }

                _context6.next = 3;
                return customerorder.getStore().get('address');

              case 3:
                _context6.t0 = _context6.sent;
                _context6.next = 7;
                break;

              case 6:
                _context6.t0 = customerorder.deliveryAddress;

              case 7:
                return _context6.abrupt('return', _context6.t0);

              case 8:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function address(_x11) {
        return _ref12.apply(this, arguments);
      }

      return address;
    }(),
    orderStatus: function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(customerorder) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return customerorder.getOrderStatus().get('name');

              case 2:
                return _context7.abrupt('return', _context7.sent);

              case 3:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function orderStatus(_x12) {
        return _ref13.apply(this, arguments);
      }

      return orderStatus;
    }(),
    orderDate: function orderDate(_ref14) {
      var createdAt = _ref14.createdAt;

      return createdAt;
    }
  },
  OrderDetail: {
    modifierIds: function modifierIds(_ref15) {
      var modifierIds = _ref15.modifierIds;

      return modifierIds.split(',').map(Number);
    }
  },
  HistoryPlaceOrderMethod: {
    address: function () {
      var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(historyOrder) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!historyOrder.isStorePickUp) {
                  _context8.next = 6;
                  break;
                }

                _context8.next = 3;
                return historyOrder.getStore().get('address');

              case 3:
                _context8.t0 = _context8.sent;
                _context8.next = 7;
                break;

              case 6:
                _context8.t0 = historyOrder.deliveryAddress;

              case 7:
                return _context8.abrupt('return', _context8.t0);

              case 8:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function address(_x13) {
        return _ref16.apply(this, arguments);
      }

      return address;
    }()
  }
};
exports.default = resolvers;