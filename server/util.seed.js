const {GoogleSpreadsheet} = require('google-spreadsheet'),
  _d = require('lodash'),
  creds = require('./TP-TEA-HK-4be78b7ad5f8.json'),
  getData = async sheetId => {
    const doc = new GoogleSpreadsheet(sheetId)
    await doc.useServiceAccountAuth(creds)
    // Load the spreadsheet information
    await doc.loadInfo()
    // Access the first sheet in the spreadsheet
    const sheet = doc.sheetsByIndex[0]
    // Read data from the sheet
    return await sheet.getRows()
  }
module.exports = {
  getData,
  _d,
}
