'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('menulocation', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      menuId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'menus',
          key: 'id',
        },
      },
      locationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'locations',
          key: 'id',
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('menulocation')
  },
}
