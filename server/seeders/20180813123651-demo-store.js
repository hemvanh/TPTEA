'use strict'
const {getData, _d} = require('./utils')
module.exports = {
  async up(queryInterface, Sequelize) {
    var data = await getData('1qUFzIif4CFQ64-jf4OOtFQK8rKY7YHqN3PxSATHjy3w').catch(err => console.log(err))
    return queryInterface.bulkInsert(
      'stores',
      _d.map(data, row => _d.pick(row, ['id', 'name', 'address', 'gmapaddress', 'phone', 'lat', 'lng', 'city', 'nation'])),
      {}
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('stores', null, {})
  },
}
