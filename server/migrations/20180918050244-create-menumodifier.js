'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('menumodifies', {
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
      modifierId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'modifiers',
          key: 'id',
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('menumodifies')
  },
}
