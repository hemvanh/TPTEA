'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('../util.seed'),
    getData = _require.getData,
    _d = _require._d;

module.exports = {
  up: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(queryInterface, Sequelize) {
      var data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getData('1eLaKPRImQNFc5-CVwTnp4q1VLqrrzx1q6qmhp1Ppp5E').catch(function (err) {
                return console.log(err);
              });

            case 2:
              data = _context.sent;
              return _context.abrupt('return', queryInterface.bulkInsert('locations', _d.map(data, function (row) {
                return _d.pick(row, ['id', 'code', 'name']);
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
    return queryInterface.bulkDelete('locations', null, {});
  }
};