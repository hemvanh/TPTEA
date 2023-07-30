'use strict'

const {GoogleSpreadsheet} = require('google-spreadsheet')
var _d = require('lodash')
var creds = require('../TP-TEA-HK-4be78b7ad5f8.json')

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('1p_tzXdaZAXMR1dfnZyQPJBjfgM4WJ3NfVs2yKTIXbWg')

async function getData() {
  await doc.useServiceAccountAuth(creds)
  // Load the spreadsheet information
  await doc.loadInfo()
  // Access the first sheet in the spreadsheet
  const sheet = doc.sheetsByIndex[0]
  // Read data from the sheet
  return await sheet.getRows()
}

module.exports = {
  async up(queryInterface, Sequelize) {
    var data = await getData().catch(err => console.log(err))
    // console.log(data)
    return queryInterface.bulkInsert('menus', _d.map(data, row => _d.pick(row, ['id', 'name', 'desc', 'price', 'img', 'categoryId'])), {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('menus', null, {})
  },
}
