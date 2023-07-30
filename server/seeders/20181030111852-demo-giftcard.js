'use strict'
const {getData, _d} = require('./utils')
module.exports = {
  async up(queryInterface, Sequelize) {
    var data = await getData('14ShSC1gocvbzP8RGP6lk03QxAejjRYK05cRnBr6Hv7k').catch(err => console.log(err))
    // console.log(data)
    return queryInterface.bulkInsert(
      'giftcards',
      _d.map(data, row => _d.pick(row, ['id', 'code', 'amount', 'expiry', 'createdat', 'updatedat', 'customerid', 'isprinted'])),
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('giftcards', null, {})
  },
}
