const {getData, _d} = require('./utils')
module.exports = {
  async up(queryInterface, Sequelize) {
    var data = await getData().catch(err => console.log(err))
    return queryInterface.bulkInsert('orderstatuses', _d.map(data, row => _d.pick(row, 'id', 'name', 'notes')), {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('orderstatuses', null, {})
  },
}
