'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Stores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100)
      },
      address: {
        type: Sequelize.STRING(500)
      },
      gmapAddress: {
        type: Sequelize.STRING(500)
      },
      phone: {
        type: Sequelize.STRING(15)
      },
      lat: {
        type: Sequelize.FLOAT(10, 6)
      },
      lng: {
        type: Sequelize.FLOAT(10, 6)
      },
      city: {
        type: Sequelize.STRING(20)
      },
      nation: {
        type: Sequelize.STRING(20)
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Stores');
  }
};