'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('google-spreadsheet'),
    GoogleSpreadsheet = _require.GoogleSpreadsheet,
    _d = require('lodash'),
    creds = require('./TP-TEA-HK-4be78b7ad5f8.json'),
    getData = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sheetId) {
    var doc, sheet;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            doc = new GoogleSpreadsheet(sheetId);
            _context.next = 3;
            return doc.useServiceAccountAuth(creds);

          case 3:
            _context.next = 5;
            return doc.loadInfo();

          case 5:
            // Access the first sheet in the spreadsheet
            sheet = doc.sheetsByIndex[0];
            // Read data from the sheet

            _context.next = 8;
            return sheet.getRows();

          case 8:
            return _context.abrupt('return', _context.sent);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getData(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = {
  getData: getData,
  _d: _d
};