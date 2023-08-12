'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OrderStatuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(20),
      },
      notes: {
        type: Sequelize.STRING(200),
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orderstatuses')
  },
}
