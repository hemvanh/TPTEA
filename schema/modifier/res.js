'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _util = require('../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var resolvers = {
  RootQuery: {
    fetchModifiers: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref) {
        var input = _ref.input;
        var menu, dataModifiers;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                menu = new _models.Menu(input);
                _context.next = 3;
                return menu.getModifiers();

              case 3:
                dataModifiers = _context.sent;
                return _context.abrupt('return', _lodash2.default.chain(dataModifiers).groupBy('groupTitle').map(function (data, groupTitle) {
                  return {
                    data: data,
                    groupTitle: groupTitle,
                    groupType: data[0].groupType
                  };
                }).value());

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchModifiers(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return fetchModifiers;
    }(),
    fetchAllModifiers: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _models.Modifier.findAll();

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchAllModifiers() {
        return _ref3.apply(this, arguments);
      }

      return fetchAllModifiers;
    }(),
    fetchAdminModifiers: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _models.Modifier.findAll();

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function fetchAdminModifiers() {
        return _ref4.apply(this, arguments);
      }

      return fetchAdminModifiers;
    }()
  },
  RootMutation: {
    createAdminModifier: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref5, _ref6) {
        var input = _ref5.input;
        var loggedInUser = _ref6.loggedInUser;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                (0, _util._authAdmin)(loggedInUser);
                _context4.next = 3;
                return _models.Modifier.create(input).then(function (modifier) {
                  return modifier;
                });

              case 3:
                return _context4.abrupt('return', _context4.sent);

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function createAdminModifier(_x3, _x4, _x5) {
        return _ref7.apply(this, arguments);
      }

      return createAdminModifier;
    }(),
    updateAdminModifier: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref8, _ref9) {
        var input = _ref8.input;
        var loggedInUser = _ref9.loggedInUser;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                (0, _util._authAdmin)(loggedInUser);
                _context5.next = 3;
                return _models.Modifier.update(input, {
                  where: {
                    id: input.id
                  }
                }).then(function () {
                  return input;
                });

              case 3:
                return _context5.abrupt('return', _context5.sent);

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function updateAdminModifier(_x6, _x7, _x8) {
        return _ref10.apply(this, arguments);
      }

      return updateAdminModifier;
    }(),
    deleteAdminModifiers: function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_, _ref11, _ref12) {
        var input = _ref11.input;
        var loggedInUser = _ref12.loggedInUser;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                (0, _util._authAdmin)(loggedInUser);
                _context6.next = 3;
                return _models.Modifier.destroy({
                  where: {
                    id: {
                      $in: input
                    }
                  }
                });

              case 3:
                return _context6.abrupt('return', _context6.sent);

              case 4:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function deleteAdminModifiers(_x9, _x10, _x11) {
        return _ref13.apply(this, arguments);
      }

      return deleteAdminModifiers;
    }()
  }
};
exports.default = resolvers;