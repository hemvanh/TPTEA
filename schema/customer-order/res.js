'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('../../util');

var _models = require('../../models');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
  RootMutation: {},
  CustomerOrder: {
    address: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(customerorder) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!customerorder.isStorePickUp) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 3;
                return customerorder.getStore().get('address');

              case 3:
                _context3.t0 = _context3.sent;
                _context3.next = 7;
                break;

              case 6:
                _context3.t0 = customerorder.deliveryAddress;

              case 7:
                return _context3.abrupt('return', _context3.t0);

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function address(_x7) {
        return _ref7.apply(this, arguments);
      }

      return address;
    }(),
    orderStatus: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(customerorder) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return customerorder.getOrderStatus().get('name');

              case 2:
                return _context4.abrupt('return', _context4.sent);

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function orderStatus(_x8) {
        return _ref8.apply(this, arguments);
      }

      return orderStatus;
    }(),
    orderDate: function orderDate(_ref9) {
      var createdAt = _ref9.createdAt;

      return createdAt;
    }
  },
  OrderDetail: {
    modifierIds: function modifierIds(_ref10) {
      var modifierIds = _ref10.modifierIds;

      return modifierIds.split(',').map(Number);
    }
  },
  HistoryPlaceOrderMethod: {
    address: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(historyOrder) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!historyOrder.isStorePickUp) {
                  _context5.next = 6;
                  break;
                }

                _context5.next = 3;
                return historyOrder.getStore().get('address');

              case 3:
                _context5.t0 = _context5.sent;
                _context5.next = 7;
                break;

              case 6:
                _context5.t0 = historyOrder.deliveryAddress;

              case 7:
                return _context5.abrupt('return', _context5.t0);

              case 8:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function address(_x9) {
        return _ref11.apply(this, arguments);
      }

      return address;
    }()
  }
};
exports.default = resolvers;