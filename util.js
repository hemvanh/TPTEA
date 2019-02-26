'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveImage = exports.verifyCustomerPaymentId = exports.authGiftCard = exports.genGiftCard = exports._authAdmin = exports._auth = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('./models');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _auth = exports._auth = function _auth(loggedInUser) {
  if (!loggedInUser) {
    throw new Error('Please login first!');
  }
  if (loggedInUser.roles) {
    throw new Error('This is not a Valid Customer account!');
  }
};

var _authAdmin = exports._authAdmin = function _authAdmin(loggedInUser) {
  if (!loggedInUser) {
    throw new Error('Please login as an Admin first!');
  }
  if (loggedInUser.roles == undefined) {
    throw new Error('This Account is not an Admin!');
  }
};

var genGiftCard = exports.genGiftCard = function genGiftCard(giftCardId) {
  if (typeof giftCardId !== 'number') {
    throw new Error('Gift card id must be number!');
  }
  return _jsonwebtoken2.default.sign(giftCardId, process.env.JWT_GIFT_SECRET);
};

var authGiftCard = exports.authGiftCard = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(jwtGiftCard) {
    var giftCardId, giftCard, elapsedTime, expired;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            giftCardId = _jsonwebtoken2.default.verify(jwtGiftCard, process.env.JWT_GIFT_SECRET);
            _context.next = 3;
            return _models.GiftCard.findById(giftCardId);

          case 3:
            giftCard = _context.sent;

            if (!giftCard) {
              _context.next = 10;
              break;
            }

            elapsedTime = new Date().getTime() - new Date(giftCard.createdAt).getTime();
            expired = giftCard.expiry * 86400000 < elapsedTime;
            return _context.abrupt('return', {
              giftCard: giftCard,
              expired: expired
            });

          case 10:
            throw new Error('This gift card not available!');

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function authGiftCard(_x) {
    return _ref.apply(this, arguments);
  };
}();

var verifyCustomerPaymentId = exports.verifyCustomerPaymentId = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(jwtPayment) {
    var jwtDecode;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            jwtDecode = _jsonwebtoken2.default.verify(jwtPayment, process.env.JWT_SECRET).split('_').map(function (number) {
              return parseInt(number);
            });

            if (!(new Date().getTime() - jwtDecode[1] > 30000)) {
              _context2.next = 5;
              break;
            }

            throw new Error('Customer Payment Id is expired!');

          case 5:
            _context2.next = 7;
            return _models.Customer.findById(jwtDecode[0]);

          case 7:
            _context2.t0 = _context2.sent;

            if (_context2.t0) {
              _context2.next = 10;
              break;
            }

            _context2.t0 = new Error('Customer not found!');

          case 10:
            return _context2.abrupt('return', _context2.t0);

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function verifyCustomerPaymentId(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var saveImage = exports.saveImage = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(imageUploadData) {
    var ext, img, imgName;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!_fs2.default.existsSync('statics')) {
              _fs2.default.mkdirSync('statics');
            }
            ext = imageUploadData.split(';')[0].match(/jpeg|png/)[0];
            img = imageUploadData.replace(/^data:image\/\w+;base64,/, '');
            imgName = new Date().getTime() + '.' + ext;
            return _context3.abrupt('return', new Promise(function (resolve) {
              _fs2.default.writeFile('statics/' + imgName, img, 'base64', function (err) {
                if (err) throw err;
                resolve(imgName);
              });
            }));

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function saveImage(_x3) {
    return _ref3.apply(this, arguments);
  };
}();