'use strict'
const {getData, _d} = require('../util.seed')
module.exports = {
  async up(queryInterface, Sequelize) {
    var data = await getData('1hj2n03kXu7NAx9bkEg6TcgCBeyzEo_fumoiNQZQfQKs').catch(err => console.log(err))
    return queryInterface.bulkInsert('menumodifier', _d.map(data, row => _d.pick(row, ['id', 'menuid', 'modifierid'])), {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('menumodifier', null, {})
  },
}
