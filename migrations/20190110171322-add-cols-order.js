'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(function (t) {
      return Promise.all([queryInterface.addColumn('orders', 'storeId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'stores',
          key: 'id'
        },
        allowNull: true
      }, { transaction: t }), queryInterface.addColumn('orders', 'isStorePickUp', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }, { transaction: t }), queryInterface.addColumn('orders', 'deliveryAddress', {
        type: Sequelize.STRING(500),
        allowNull: true
      }, { transaction: t }), queryInterface.addColumn('orders', 'deliveryContact', {
        type: Sequelize.STRING(50),
        allowNull: true
      }, { transaction: t }), queryInterface.addColumn('orders', 'receivingTime', {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: new Date()
      }, { transaction: t }), queryInterface.addColumn('orders', 'totalAmount', {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0
      }, { transaction: t }), queryInterface.addColumn('orders', 'orderStatusId', {
        type: Sequelize.INTEGER,
        allowNull: true
      }, { transaction: t })]);
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(function (t) {
      return Promise.all([queryInterface.removeColumn('orders', 'storeId', { transaction: t }), queryInterface.removeColumn('orders', 'isStorePickUp', { transaction: t }), queryInterface.removeColumn('orders', 'receivingTime', { transaction: t }), queryInterface.removeColumn('orders', 'deliveryAddress', { transaction: t }), queryInterface.removeColumn('orders', 'deliveryContact', { transaction: t }), queryInterface.removeColumn('orders', 'totalAmount', { transaction: t }), queryInterface.removeColumn('orders', 'orderStatusId', { transaction: t })]);
    });
  }
};