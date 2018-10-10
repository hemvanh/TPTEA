'use strict'
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define(
    'Order',
    {
      customerId: DataTypes.INTEGER,
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
