'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _util = require('../../util');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var resolvers = {
  RootQuery: {
    listCategories: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref) {
        var input = _ref.input;
        var mainCategory;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                mainCategory = new _models.MainCategory({ id: input });
                _context.next = 3;
                return mainCategory.getCategories();

              case 3:
                return _context.abrupt('return', _context.sent);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function listCategories(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return listCategories;
    }(),
    fetchAllCategoriesAdmin: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, __, _ref3) {
        var loggedInUser = _ref3.loggedInUser;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                (0, _util._authAdmin)(loggedInUser);
                _context2.next = 3;
                return _models.Category.findAll();

              case 3:
                return _context2.abrupt('return', _context2.sent);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchAllCategoriesAdmin(_x3, _x4, _x5) {
        return _ref4.apply(this, arguments);
      }

      return fetchAllCategoriesAdmin;
    }()
  },
  RootMutation: {
    createCategory: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_, _ref5, _ref6) {
        var input = _ref5.input;
        var loggedInUser = _ref6.loggedInUser;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                (0, _util._authAdmin)(loggedInUser);
                _context3.next = 3;
                return _models.Category.create(input).then(function (category) {
                  return category;
                });

              case 3:
                return _context3.abrupt('return', _context3.sent);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createCategory(_x6, _x7, _x8) {
        return _ref7.apply(this, arguments);
      }

      return createCategory;
    }(),
    updateCategory: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_, _ref8, _ref9) {
        var input = _ref8.input;
        var loggedInUser = _ref9.loggedInUser;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                (0, _util._authAdmin)(loggedInUser);
                _context4.next = 3;
                return _models.Category.update(input, {
                  where: {
                    id: input.id
                  }
                }).then(function () {
                  return input;
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

      function updateCategory(_x9, _x10, _x11) {
        return _ref10.apply(this, arguments);
      }

      return updateCategory;
    }(),
    deleteCategories: function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_, _ref11, _ref12) {
        var input = _ref11.input;
        var loggedInUser = _ref12.loggedInUser;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                (0, _util._authAdmin)(loggedInUser);
                _context5.next = 3;
                return _models.Category.destroy({
                  where: {
                    id: {
                      $in: input
                    }
                  }
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

      function deleteCategories(_x12, _x13, _x14) {
        return _ref13.apply(this, arguments);
      }

      return deleteCategories;
    }()
  },
  Category: {
    mainCategoryName: function () {
      var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref14) {
        var mainCategoryId = _ref14.mainCategoryId;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _models.MainCategory.findOne({ where: { id: mainCategoryId } }).get('name');

              case 2:
                return _context6.abrupt('return', _context6.sent);

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function mainCategoryName(_x15) {
        return _ref15.apply(this, arguments);
      }

      return mainCategoryName;
    }()
  }
};
exports.default = resolvers;