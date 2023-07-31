'use strict'
const {getData, _d} = require('../util.seed')
module.exports = {
  async up(queryInterface, Sequelize) {
    var data = await getData('1p_tzXdaZAXMR1dfnZyQPJBjfgM4WJ3NfVs2yKTIXbWg').catch(err => console.log(err))
    return queryInterface.bulkInsert('menus', _d.map(data, row => _d.pick(row, ['id', 'name', 'desc', 'price', 'img', 'categoryId'])), {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('menus', null, {})
  },
}
