'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('orders', 'storeId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'stores',
          key: 'id',
        },
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      }),
      queryInterface.addColumn('orders', 'delivery-address', {
        type: Sequelize.STRING(500),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      }),
    ]
  },
  down: (queryInterface, Sequelize) => {
    return [queryInterface.removeColumn('orders', 'storeId'), queryInterface.removeColumn('orders', 'delivery-address')]
  },
}
