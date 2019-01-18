'use strict'

var GoogleSpreadsheet = require('google-spreadsheet')
var _d = require('lodash')
var creds = require('../TP-TEA-HK-4be78b7ad5f8.json')

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('1qUFzIif4CFQ64-jf4OOtFQK8rKY7YHqN3PxSATHjy3w')

function getData() {
  return new Promise((resolve, reject) => {
    doc.useServiceAccountAuth(creds, err => {
      doc.getRows(1, (err, rows) => {
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
    return queryInterface.bulkInsert(
      'stores',
      _d.map(data, row =>
        _d.pick(row, ['id', 'name', 'address', 'addressgmap', 'phone', 'lat', 'lng', 'city', 'nation'])
      ),
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('stores', null, {})
  },
}
