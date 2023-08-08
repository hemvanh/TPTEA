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
    listMenus: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref) {
        var input = _ref.input;
        var cat;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cat = new _models.Category({ id: input });
                _context.next = 3;
                return cat.getMenus();

              case 3:
                return _context.abrupt('return', _context.sent);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function listMenus(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return listMenus;
    }(),
    fetchAllMenus: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _models.Menu.findAll();

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchAllMenus() {
        return _ref3.apply(this, arguments);
      }

      return fetchAllMenus;
    }()
  },
  RootMutation: {
    createMenu: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref4, _ref5) {
        var input = _ref4.input;
        var loggedInUser = _ref5.loggedInUser;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                (0, _util._authAdmin)(loggedInUser);
                return _context3.abrupt('return', _models.sequelize.transaction(function (t) {
                  return _models.Menu.create(input, { transaction: t }).then(function (menu) {
                    return menu.addModifiers(input.modifierIds, { transaction: t }).then(function () {
                      return menu;
                    });
                  });
                }));

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createMenu(_x3, _x4, _x5) {
        return _ref6.apply(this, arguments);
      }

      return createMenu;
    }(),
    updateMenu: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref7, _ref8) {
        var input = _ref7.input;
        var loggedInUser = _ref8.loggedInUser;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                (0, _util._authAdmin)(loggedInUser);
                return _context4.abrupt('return', _models.sequelize.transaction(function (t) {
                  return _models.Menu.update(input, { where: { id: input.id }, transaction: t }).then(function () {
                    var menu = new _models.Menu(input);
                    return menu.setModifiers(input.modifierIds, { transaction: t }).then(function () {
                      return menu;
                    });
                  });
                }));

              case 2:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateMenu(_x6, _x7, _x8) {
        return _ref9.apply(this, arguments);
      }

      return updateMenu;
    }(),
    deleteMenus: function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref10, _ref11) {
        var input = _ref10.input;
        var loggedInUser = _ref11.loggedInUser;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                (0, _util._authAdmin)(loggedInUser);
                _context5.next = 3;
                return _models.Menu.destroy({
                  where: {
                    id: {
                      $in: input
                    }
                  }
                }).catch(function (err) {
                  if (err.parent.errno === 1451) throw new Error('This menu is linked to another table');else throw new Error(err);
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

      function deleteMenus(_x9, _x10, _x11) {
        return _ref12.apply(this, arguments);
      }

      return deleteMenus;
    }()
  },
  Menu: {
    mainCategoryId: function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref13) {
        var categoryId = _ref13.categoryId;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _models.Category.findOne({ where: { id: categoryId } }).get('mainCategoryId');

              case 2:
                return _context6.abrupt('return', _context6.sent);

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function mainCategoryId(_x12) {
        return _ref14.apply(this, arguments);
      }

      return mainCategoryId;
    }(),
    modifierIds: function () {
      var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(menu) {
        var modifiers;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return menu.getModifiers();

              case 2:
                modifiers = _context7.sent;
                return _context7.abrupt('return', _lodash2.default.map(modifiers, 'id'));

              case 4:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function modifierIds(_x13) {
        return _ref15.apply(this, arguments);
      }

      return modifierIds;
    }()
  }
};
exports.default = resolvers;