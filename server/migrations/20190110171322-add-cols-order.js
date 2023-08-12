'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'Orders',
          'storeId',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Stores',
              key: 'id',
            },
            allowNull: true,
          },
          {transaction: t}
        ),
        queryInterface.addColumn(
          'Orders',
          'isStorePickUp',
          {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
          },
          {transaction: t}
        ),
        queryInterface.addColumn(
          'Orders',
          'deliveryAddress',
          {
            type: Sequelize.STRING(500),
            allowNull: true,
          },
          {transaction: t}
        ),
        queryInterface.addColumn(
          'Orders',
          'deliveryContact',
          {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          {transaction: t}
        ),
        queryInterface.addColumn(
          'Orders',
          'receivingTime',
          {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: new Date(),
          },
          {transaction: t}
        ),        
        queryInterface.addColumn(
          'Orders',
          'totalAmount',
          {
            type: Sequelize.FLOAT,
            allowNull: true,
            defaultValue: 0,
          },
          {transaction: t}
        ),
        queryInterface.addColumn(
          'Orders',
          'orderStatusId',
          {
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          {transaction: t}
        ),
      ])
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Orders', 'storeId', {transaction: t}),
        queryInterface.removeColumn('Orders', 'isStorePickUp', {transaction: t}),
        queryInterface.removeColumn('Orders', 'receivingTime', {transaction: t}),
        queryInterface.removeColumn('Orders', 'deliveryAddress', {transaction: t}),
        queryInterface.removeColumn('Orders', 'deliveryContact', {transaction: t}),
        queryInterface.removeColumn('Orders', 'totalAmount', {transaction: t}),
        queryInterface.removeColumn('Orders', 'orderStatusId', {transaction: t}),
      ])
    })
  },
}
