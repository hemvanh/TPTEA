'use strict'
var {faker} = require('@faker-js/faker')
module.exports = {
  async up(queryInterface, Sequelize) {
    var stores = [],
      location = faker.location
    Array.from({length: 10}).forEach(() => {
      stores.push({
        name: faker.person.fullName(),
        address: location.city(),
        gmapAddress: `${location.streetAddress()}, ${location.state()}, ${location.city()}, ${location.country()}`,
        phone: faker.phone.number(),
        lat: location.latitude(),
        lng: location.longitude(),
        address: location.city(),
        nation: location.country(),
      })
    })
    return queryInterface.bulkInsert('stores', stores, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('stores', null, {})
  },
}
