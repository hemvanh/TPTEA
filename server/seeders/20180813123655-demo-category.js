'use strict'
const {getData, _d} = require('./utils')
module.exports = {
  async up(queryInterface, Sequelize) {
    var data = await getData('1QzXfwDPxwmCOTHLbPqoI74dIu0S4zQisposaSI7wJbU').catch(err => console.log(err))
    return queryInterface.bulkInsert('categories', _d.map(data, row => _d.pick(row, ['id', 'name', 'desc', 'img', 'maincategoryId'])), {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {})
  },
}
