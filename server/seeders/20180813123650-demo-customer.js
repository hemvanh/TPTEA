var {faker} = require('@faker-js/faker')
const md5 = require('md5')
module.exports = {
  async up(queryInterface, Sequelize) {
    var customers = []
    Array.from({length: 1000}).forEach(() => {
      customers.push({
        name: faker.person.fullName(),
        address: faker.location.city(),
        phone: faker.phone.number(),
        username: faker.internet.userName(),
        password: md5(123),
        points: faker.number.int({min: 1, max: 1000}),
        balance: faker.number.int({min: 500, max: 100000}),
      })
    })
    console.log(customers)
    return queryInterface.bulkInsert('customers', customers, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('customers', null, {})
  },
}
