# Quasar App

## Revived Logs
### Sever project
    
    5. Mysql server 5
#### Seed part 
 1. Update credential json 
 2. Enable Sheet API https://console.cloud.google.com/apis/api/sheets.googleapis.com/metrics?project=tptea-394106
 3. Change ```getData()``` function :
    ```js
    async function getData() {
        await doc.useServiceAccountAuth(creds)
        // Load the spreadsheet information
        await doc.loadInfo()
        // Access the first sheet in the spreadsheet
        const sheet = doc.sheetsByIndex[0]
        // Read data from the sheet
        return await sheet.getRows()
    }
    ```
 4. Update version Google-spreadsheet": "^3.3.0"
### Frontend project 
    1. Nodejs v10.24.1 || v12.1.0 (for faker module )
    2. Npm v6.14.15 | 6.9.0
    3. Python v2.7
    4. Build Tools for Visual Studio 2019

