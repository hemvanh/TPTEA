'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING
      },
      img: {
        type: Sequelize.TEXT
      },
      mainCategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'maincategories',
          key: 'id'
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('categories');
  }
};