const {getData, _d} = require('../util.seed')
module.exports = {
  async up(queryInterface, Sequelize) {
    var data = await getData('1qFpMLDWABXh2JFg_h6VZbZt5OxslSuvjzS1Zn74uSag').catch(err => console.log(err))
    return queryInterface.bulkInsert(
      'Customers',
      _d.map(data, row => _d.pick(row, 'id', 'name', 'address', 'phone', 'username', 'password', 'points', 'balance', 'type')),
      {}
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('customers', null, {})
  },
}
