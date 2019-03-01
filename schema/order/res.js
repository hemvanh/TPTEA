'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var createOrder = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(input) {
    var order, orderDetails, menuIds, menus, arrModifierIds, modifierIds, modifiers, totalAmount;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            order = formatOrderInput(input);

            if (order.isStorePickUp) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return findNearestStoreId(order.deliveryAddress);

          case 5:
            order.storeId = _context.sent;
            _context.next = 10;
            break;

          case 8:
            order.deliveryAddress = null;
            order.deliveryContact = null;

          case 10:
            order.orderStatusId = DEFAULT_ORDER_STATUS;

            orderDetails = order.orderDetails;
            menuIds = orderDetails.map(function (orderDetail) {
              return orderDetail.menuId;
            });
            _context.next = 15;
            return _models.Menu.findAll({ where: { id: menuIds } });

          case 15:
            menus = _context.sent;
            arrModifierIds = orderDetails.map(function (orderDetail) {
              return orderDetail.modifierIds;
            });
            modifierIds = [].concat(_toConsumableArray(new Set([].concat.apply([], arrModifierIds))));
            _context.next = 20;
            return _models.Modifier.findAll({ where: { id: modifierIds } });

          case 20:
            modifiers = _context.sent;
            totalAmount = 0;

            orderDetails.map(function (orderDetail) {
              var menuPrice = menus.find(function (menu) {
                return menu.get('id') === orderDetail.menuId;
              }).get('price');
              var modifiersPrice = getModifiersPrice(modifiers, orderDetail.modifierIds);
              orderDetail.price = (parseFloat(menuPrice) + modifiersPrice) * orderDetail.quantity;
              orderDetail.modifierIds = orderDetail.modifierIds.toString();
              totalAmount += orderDetail.price;
            });
            order.totalAmount = totalAmount;

            return _context.abrupt('return', order);

          case 27:
            _context.prev = 27;
            _context.t0 = _context['catch'](0);
            throw new Error(_context.t0.message);

          case 30:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 27]]);
  }));

  return function createOrder(_x) {
    return _ref.apply(this, arguments);
  };
}();

var findNearestStoreId = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(deliveryAddress) {
    var _this = this;

    var stores, storeAddresses, url, distances, storeName;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _models.Store.findAll();

          case 3:
            stores = _context3.sent;
            storeAddresses = getStoreAddresses(stores);
            url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + deliveryAddress + '&destinations=' + storeAddresses + '&key=' + apiKey;
            _context3.next = 8;
            return fetch(url).then(function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(res) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return res.json();

                      case 2:
                        return _context2.abrupt('return', _context2.sent);

                      case 3:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this);
              }));

              return function (_x3) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 8:
            distances = _context3.sent;
            storeName = findNearestStoreName(distances);
            return _context3.abrupt('return', _lodash2.default.find(stores, { dataValues: { gmapAddress: storeName } }).get('id'));

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3['catch'](0);
            throw new Error(_context3.t0);

          case 16:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 13]]);
  }));

  return function findNearestStoreId(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _models = require('../../models');

var _util = require('../../util');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fetch = require('node-fetch');
var apiKey = 'AIzaSyCEUChDraEFCd3f79AK2xSh1FFDDJUpnWw';
var MAX_STORE_DISTANCE = 20000;
var DEFAULT_ORDER_STATUS = 1;
//#region function support for "placeOrder" resolver
function formatOrderInput(input) {
  var formatedInput = _extends({}, input, input.placeOrderMethod);
  delete formatedInput.placeOrderMethod;
  return formatedInput;
}

function updateOrderDetailsWithOrderId(orderDetails, orderId) {
  orderDetails.map(function (orderDetail) {
    orderDetail.orderId = orderId;
  });
  return orderDetails;
}
function getModifiersPrice(modifiers, modifierIds) {
  try {
    var modifiersPrice = 0;
    modifierIds.forEach(function (modifierId) {
      var modifierPrice = modifiers.find(function (modifier) {
        return modifier.get('id') === modifierId;
      }).get('price');
      modifiersPrice += parseFloat(modifierPrice);
    });
    return modifiersPrice;
  } catch (error) {
    throw new Error(error.message);
  }
}

function findNearestStoreName(distances) {
  var elements = _lodash2.default.map(distances.rows[0].elements, 'distance.value');
  var minIndex = elements.indexOf(_lodash2.default.min(elements));
  var nearestDistance = elements[minIndex];
  if (nearestDistance === undefined) {
    throw new Error('No nearest store found !');
  } else if (nearestDistance > MAX_STORE_DISTANCE) {
    throw new Error('The distance from the nearest store is: ' + Math.floor(nearestDistance / 1000) + 'km, which is more than ' + Math.floor(MAX_STORE_DISTANCE / 1000) + 'km');
  }
  return distances.destination_addresses[minIndex];
}
function getStoreAddresses(stores) {
  return _lodash2.default.map(stores, 'dataValues.gmapAddress').join('|');
}
//#endregion function support for "placeOrder" resolver

var resolvers = {
  RootQuery: {
    fetchOrders: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, __, _ref4) {
        var loggedInUser = _ref4.loggedInUser;
        var orders;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                (0, _util._authAdmin)(loggedInUser);
                _context4.next = 3;
                return _models.Order.findAll({
                  include: [_models.Store, _models.Customer, _models.OrderDetail, _models.OrderStatus]
                });

              case 3:
                orders = _context4.sent;
                return _context4.abrupt('return', orders);

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function fetchOrders(_x4, _x5, _x6) {
        return _ref5.apply(this, arguments);
      }

      return fetchOrders;
    }(),
    fetchOrdersByStoreId: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref6, _ref7) {
        var input = _ref6.input;
        var loggedInUser = _ref7.loggedInUser;
        var orders;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                (0, _util._authAdmin)(loggedInUser);
                _context5.next = 3;
                return _models.Order.findAll({
                  include: [_models.Store, _models.Customer, _models.OrderDetail, _models.OrderStatus],
                  where: { storeId: input }
                });

              case 3:
                orders = _context5.sent;
                return _context5.abrupt('return', orders);

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function fetchOrdersByStoreId(_x7, _x8, _x9) {
        return _ref8.apply(this, arguments);
      }

      return fetchOrdersByStoreId;
    }()
  },
  RootMutation: {
    placeOrder: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_, _ref9, _ref10) {
        var _this2 = this;

        var input = _ref9.input;
        var loggedInUser = _ref10.loggedInUser;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                (0, _util._auth)(loggedInUser);
                _context8.prev = 1;
                return _context8.abrupt('return', _models.sequelize.transaction(function () {
                  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(t) {
                    var order;
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            _context7.next = 2;
                            return createOrder(input);

                          case 2:
                            order = _context7.sent;
                            _context7.next = 5;
                            return _models.Order.create(order, { transaction: t }).then(function () {
                              var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(createdOrder) {
                                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                                  while (1) {
                                    switch (_context6.prev = _context6.next) {
                                      case 0:
                                        _context6.next = 2;
                                        return _models.OrderDetail.bulkCreate(updateOrderDetailsWithOrderId(order.orderDetails, createdOrder.get('id')), { transaction: t });

                                      case 2:
                                        return _context6.abrupt('return', createdOrder);

                                      case 3:
                                      case 'end':
                                        return _context6.stop();
                                    }
                                  }
                                }, _callee6, _this2);
                              }));

                              return function (_x14) {
                                return _ref13.apply(this, arguments);
                              };
                            }());

                          case 5:
                            return _context7.abrupt('return', _context7.sent);

                          case 6:
                          case 'end':
                            return _context7.stop();
                        }
                      }
                    }, _callee7, _this2);
                  }));

                  return function (_x13) {
                    return _ref12.apply(this, arguments);
                  };
                }()).then(function (createdOrder) {
                  return createdOrder.get('id');
                }).catch(function (err) {
                  throw new Error(err);
                }));

              case 5:
                _context8.prev = 5;
                _context8.t0 = _context8['catch'](1);
                throw new Error(_context8.t0.message);

              case 8:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[1, 5]]);
      }));

      function placeOrder(_x10, _x11, _x12) {
        return _ref11.apply(this, arguments);
      }

      return placeOrder;
    }(),
    updateOrderStatus: function () {
      var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(_, _ref14, _ref15) {
        var _this3 = this;

        var input = _ref14.input;
        var loggedInUser = _ref15.loggedInUser;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                (0, _util._authAdmin)(loggedInUser);
                _context11.prev = 1;
                return _context11.abrupt('return', _models.sequelize.transaction(function () {
                  var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(t) {
                    return regeneratorRuntime.wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            _context10.next = 2;
                            return _models.Order.update({ orderStatusId: input.orderStatusId }, { where: { id: input.orderId } }, { transaction: t }).then(function () {
                              var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(rowUpdated) {
                                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                                  while (1) {
                                    switch (_context9.prev = _context9.next) {
                                      case 0:
                                        return _context9.abrupt('return', rowUpdated);

                                      case 1:
                                      case 'end':
                                        return _context9.stop();
                                    }
                                  }
                                }, _callee9, _this3);
                              }));

                              return function (_x19) {
                                return _ref18.apply(this, arguments);
                              };
                            }());

                          case 2:
                            return _context10.abrupt('return', _context10.sent);

                          case 3:
                          case 'end':
                            return _context10.stop();
                        }
                      }
                    }, _callee10, _this3);
                  }));

                  return function (_x18) {
                    return _ref17.apply(this, arguments);
                  };
                }()).then(function (rowUpdated) {
                  console.log(rowUpdated);
                  return rowUpdated;
                }).catch(function (err) {
                  throw new Error(err);
                }));

              case 5:
                _context11.prev = 5;
                _context11.t0 = _context11['catch'](1);
                throw new Error(_context11.t0.message);

              case 8:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this, [[1, 5]]);
      }));

      function updateOrderStatus(_x15, _x16, _x17) {
        return _ref16.apply(this, arguments);
      }

      return updateOrderStatus;
    }()
  }
};

exports.default = resolvers;