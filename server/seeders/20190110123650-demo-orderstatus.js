module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('orderstatuses', 
    [
      {name: 'Processing'}, 
      {name: 'Paid'}, 
      {name: 'Paid & Delivered'}, 
      {name: 'Cancelled'}
    ], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('orderstatuses', null, {})
  },
}
