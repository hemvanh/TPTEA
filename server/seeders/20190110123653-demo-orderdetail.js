'use strict'
const {getData, _d} = require('./utils')
module.exports = {
  async up(queryInterface, Sequelize) {
    var data = await getData('1GMxPRlBSyukoiGSETq7xU4p0UsOv6zUNr0HyMO0MxoQ').catch(err => console.log(err))
    return queryInterface.bulkInsert(
      'orderdetails',
      _d.map(data, row => _d.pick(row, 'id', 'orderid', 'menuid', 'modifierids', 'quantity', 'price')),
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('orderdetails', null, {})
  },
}
