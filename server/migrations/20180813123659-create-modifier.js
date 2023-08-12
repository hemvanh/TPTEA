'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Modifiers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      groupTitle: {
        type: Sequelize.STRING,
      },
      groupType: {
        type: Sequelize.STRING,
      },
      isDefault: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('modifiers')
  },
}
