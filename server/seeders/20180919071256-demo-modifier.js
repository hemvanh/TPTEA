'use strict'
const {getData, _d} = require('../util.seed')
module.exports = {
  async up(queryInterface, Sequelize) {
    var data = await getData('1ZX_2fPQS17VRemtTF4m74Y_XFmjOHyqWEn8JXDdmyDI').catch(err => console.log(err))
    return queryInterface.bulkInsert(
      'Modifiers',
      _d.map(data, row => _d.pick(row, ['id', 'name', 'price', 'grouptitle', 'grouptype', 'isdefault'])),
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('modifiers', null, {})
  },
}
