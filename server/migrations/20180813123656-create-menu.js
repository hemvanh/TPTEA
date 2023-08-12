'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      desc: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      img: {
        type: Sequelize.STRING,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('menus')
  },
}
