'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'orders',
          'deliveryStoreId',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'stores',
              key: 'id',
            },
            allowNull: true,
          },
          {transaction: t}
        ),
        queryInterface.addColumn(
          'orders',
          'deliveryAddress',
          {
            type: Sequelize.STRING(500),
            allowNull: true,
          },
          {transaction: t}
        ),
        queryInterface.addColumn(
          'orders',
          'deliveryContact',
          {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          {transaction: t}
        ),
        queryInterface.addColumn(
          'orders',
          'deliveryTime',
          {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: new Date(),
          },
          {transaction: t}
        ),
        queryInterface.addColumn(
          'orders',
          'pickUpStoreId',
          {
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          {transaction: t}
        ),
        queryInterface.addColumn(
          'orders',
          'pickUpTime',
          {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: new Date(),
          },
          {transaction: t}
        ),
        queryInterface.addColumn(
          'orders',
          'isStorePickUp',
          {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
          },
          {transaction: t}
        ),
      ])
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('orders', 'deliveryStoreId', {transaction: t}),
        queryInterface.removeColumn('orders', 'deliveryAddress', {transaction: t}),
        queryInterface.removeColumn('orders', 'deliveryContact', {transaction: t}),
        queryInterface.removeColumn('orders', 'deliveryTime', {transaction: t}),
        queryInterface.removeColumn('orders', 'pickUpStoreId', {transaction: t}),
        queryInterface.removeColumn('orders', 'pickUpTime', {transaction: t}),
        queryInterface.removeColumn('orders', 'isStorePickUp', {transaction: t}),
      ])
    })
  },
}
