'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'orders',
          'storeId',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'stores',
              key: 'id',
            },
            allowNull: true,
            validate: {
              notEmpty: true,
            },
          },
          {transaction: t}
        ),
        queryInterface.addColumn(
          'orders',
          'delivery-address',
          {
            type: Sequelize.STRING(500),
            allowNull: false,
            validate: {
              notEmpty: true,
            },
          },
          {transaction: t}
        ),
      ])
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('orders', 'storeId', {transaction: t}),
        queryInterface.removeColumn('orders', 'delivery-address', {transaction: t}),
      ])
    })
  },
}
