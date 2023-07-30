'use strict'
const {getData, _d} = require('./utils')
module.exports = {
  async up(queryInterface, Sequelize) {
    var data = await getData('1eLaKPRImQNFc5-CVwTnp4q1VLqrrzx1q6qmhp1Ppp5E').catch(err => console.log(err))
    return queryInterface.bulkInsert('locations', _d.map(data, row => _d.pick(row, ['id', 'code', 'name'])), {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('locations', null, {})
  },
}
