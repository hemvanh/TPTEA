'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Categories', {
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
      img: {
        type: Sequelize.TEXT,
      },
      mainCategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'MainCategories',
          key: 'id',
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('categories')
  },
}
