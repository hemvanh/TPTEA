'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var GoogleSpreadsheet = require('google-spreadsheet');
var _d = require('lodash');
var creds = require('../TP-TEA-HK-4be78b7ad5f8.json');

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('1hj2n03kXu7NAx9bkEg6TcgCBeyzEo_fumoiNQZQfQKs');

function getData() {
  return new Promise(function (resolve, reject) {
    doc.useServiceAccountAuth(creds, function (err) {
      doc.getRows(1, function (err, rows) {
        if (err) reject(err);else resolve(rows);
      });
    });
  });
}

module.exports = {
  up: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(queryInterface, Sequelize) {
      var data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getData().catch(function (err) {
                return console.log(err);
              });

            case 2:
              data = _context.sent;
              return _context.abrupt('return', queryInterface.bulkInsert('menumodifier', _d.map(data, function (row) {
                return _d.pick(row, ['id', 'menuid', 'modifierid']);
              }), {}));

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function up(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return up;
  }(),


  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('menumodifier', null, {});
  }
};