'use strict'
var {faker} = require('@faker-js/faker')
module.exports = {
  async up(queryInterface, Sequelize) {
    var locations = []
    Array.from({length: 100}).forEach(() => {
      locations.push({
        code: faker.number.int({min: 100, max: 300}),
        name: faker.location.city(),
      })
    })
    return queryInterface.bulkInsert('locations', locations, {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('locations', null, {})
  },
}
