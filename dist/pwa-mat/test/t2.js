'use strict';

var readSpreadsheet = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var doc, creds, sheet, _d, rows;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Replace 'YOUR_SPREADSHEET_ID' with the actual ID of your Google Spreadsheet
            doc = new GoogleSpreadsheet('1QzXfwDPxwmCOTHLbPqoI74dIu0S4zQisposaSI7wJbU');
            // Load the service account credentials (JSON keyfile)

            creds = require('../TP-TEA-HK-4be78b7ad5f8.json');
            _context.prev = 2;
            _context.next = 5;
            return doc.useServiceAccountAuth(creds);

          case 5:
            _context.next = 7;
            return doc.loadInfo();

          case 7:
            // Access the first sheet in the spreadsheet
            sheet = doc.sheetsByIndex[0];
            _d = require('lodash');
            // Read data from the sheet

            _context.next = 11;
            return sheet.getRows();

          case 11:
            rows = _context.sent;

            console.log(_d.map(rows, function (row) {
              return _d.pick(row, ['id', 'name', 'desc', 'img', 'maincategoryid']);
            }));
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](2);

            console.error('Error occurred:', _context.t0);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 15]]);
  }));

  return function readSpreadsheet() {
    return _ref.apply(this, arguments);
  };
}();
// Call the function to read the spreadsheet


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('google-spreadsheet'),
    GoogleSpreadsheet = _require.GoogleSpreadsheet;

readSpreadsheet();