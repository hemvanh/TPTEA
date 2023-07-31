const {getData, _d} = require('../util.seed')
module.exports = {
  async up(queryInterface, Sequelize) {
    var data = await getData('1l-z14dx93syqESH6yunAsXMRafCz-nNqV4_7vuoMORQ').catch(err => console.log(err))
    return queryInterface.bulkInsert('orderstatuses', _d.map(data, row => _d.pick(row, 'id', 'name', 'notes')), {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('orderstatuses', null, {})
  },
}
