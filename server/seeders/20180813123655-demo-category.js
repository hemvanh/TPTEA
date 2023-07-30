'use strict'
const {GoogleSpreadsheet} = require('google-spreadsheet')
var _d = require('lodash')
var creds = require('../TP-TEA-HK-4be78b7ad5f8.json')
// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('1QzXfwDPxwmCOTHLbPqoI74dIu0S4zQisposaSI7wJbU')
async function getData() {
  await doc.useServiceAccountAuth(creds)
  // Load the spreadsheet information
  await doc.loadInfo()
  // Access the first sheet in the spreadsheet
  const sheet = doc.sheetsByIndex[0]
  // Read data from the sheet
  const rows = await sheet.getRows()
  return _d.map(rows, row => _d.pick(row, ['id', 'name', 'desc', 'img', 'maincategoryid']))
}
module.exports = {
  async up(queryInterface, Sequelize) {
    var data = await getData().catch(err => console.log(err))
    // console.log(data)
    return queryInterface.bulkInsert('categories', data, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {})
  },
}
