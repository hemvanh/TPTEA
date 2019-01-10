'use strict'
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define(
    'Order',
    {
      customerId: DataTypes.INTEGER,
      storeId: DataTypes.INTEGER,
      deliveryAddress: DataTypes.STRING(500),
    },
    {}
  )
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.Customer, {
      foreignKey: 'customerId',
    })
    Order.hasMany(models.OrderDetail, {
      foreignKey: 'orderId',
    })
  }
  return Order
}
