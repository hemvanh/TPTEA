'use strict'
const {getData, _d} = require('../util.seed')
module.exports = {
  async up(queryInterface, Sequelize) {
    var data = await getData('1jjROzUPDDOz5MgRLlG6uyA3SJz7ps5fmw-L6SI81gD8').catch(err => console.log(err))
    return queryInterface.bulkInsert(
      'Orders',
      _d.map(data, row => _d.pick(row, 'id', 'customerid','storeid','isstorepickup','receivingtime','deliveryaddress','deliverycontact','totalamount','orderstatusid')),
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('orders', null, {})
  },
}
