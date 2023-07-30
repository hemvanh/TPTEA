const { GoogleSpreadsheet } = require('google-spreadsheet');
async function readSpreadsheet() {
  // Replace 'YOUR_SPREADSHEET_ID' with the actual ID of your Google Spreadsheet
  const doc = new GoogleSpreadsheet('1QzXfwDPxwmCOTHLbPqoI74dIu0S4zQisposaSI7wJbU');
  // Load the service account credentials (JSON keyfile)
  const creds = require('../TP-TEA-HK-4be78b7ad5f8.json');
  try {
    // Use the service account credentials to authenticate
    await doc.useServiceAccountAuth(creds);
    // Load the spreadsheet information
    await doc.loadInfo();
    // Access the first sheet in the spreadsheet
    const sheet = doc.sheetsByIndex[0];
    var _d = require('lodash')
    // Read data from the sheet
    const rows = await sheet.getRows();
    console.log(_d.map(rows, row => _d.pick(row, ['id', 'name', 'desc', 'img','maincategoryid'])))
  } catch (error) {
    console.error('Error occurred:', error);
  }
}
// Call the function to read the spreadsheet
readSpreadsheet();
