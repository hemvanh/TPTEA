'use strict'
const {getData, _d} = require('../util.seed')
module.exports = {
  async up(queryInterface, Sequelize) {
    var data = await getData('1DulYEp9x5t33Beg7ys4ZadErrK9LcBaBN11tyca08KQ').catch(err => console.log(err))
    return queryInterface.bulkInsert('MainCategories', _d.map(data, row => _d.pick(row, ['id', 'name', 'desc', 'img'])), {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('maincategories', null, {})
  },
}
