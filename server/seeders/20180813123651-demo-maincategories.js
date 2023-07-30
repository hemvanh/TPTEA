'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'maincategories',
      [
        {
          desc: 'Hot Drink',
          img: 'main-category-hot.jpg',
          name: 'Hot',
        },
        {
          desc: 'Cold Drink',
          img: 'main-category-cold.jpg',
          name: 'Cold',
        },
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('maincategories', null, {})
  },
}
