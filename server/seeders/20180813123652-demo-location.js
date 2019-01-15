'use strict'

var GoogleSpreadsheet = require('google-spreadsheet')
var _d = require('lodash')
var creds = require('../TP-TEA-HK-4be78b7ad5f8.json')

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('1vN_Wrcc4N5DAnmhBjQQYdcPKYtQpHn_CXfdHyac7akM')

function getData() {
  return new Promise((resolve, reject) => {
    doc.useServiceAccountAuth(creds, function (err) {
      doc.getRows(1, function (err, rows) {
        if (err) reject(err)
        else resolve(rows)
      })
    })
  })
}

module.exports = {
  async up(queryInterface, Sequelize) {
    var data = await getData().catch(err => console.log(err))
    // console.log(data)
    return queryInterface.bulkInsert('locations', _d.map(data, row => _d.pick(row, ['id', 'code', 'name'])), {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('locations', null, {})
  },
}
