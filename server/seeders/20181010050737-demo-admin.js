'use strict'
const {getData, _d} = require('./utils')
module.exports = {
  async up(queryInterface, Sequelize) {
    var data = await getData('1gjAuSUmYPX9jPtdbTI01fvZAvZZD02e8bieCJdC9yIQ').catch(err => console.log(err))
    return queryInterface.bulkInsert('admins', _d.map(data, row => _d.pick(row, 'id', 'username', 'password', 'roles')), {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admins', null, {})
  },
}
