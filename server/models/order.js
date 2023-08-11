'use strict'
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define(
    'order',
    {
      customerId: DataTypes.INTEGER,
      storeId: DataTypes.INTEGER,
      isStorePickUp: DataTypes.BOOLEAN,
      receivingTime: DataTypes.DATE,
      deliveryAddress: DataTypes.STRING(500),
      deliveryContact: DataTypes.STRING(50),
      totalAmount: DataTypes.FLOAT,
      orderStatusId: DataTypes.INTEGER,
    },
    {}
  )
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.customer, {
      foreignKey: 'customerId',
    })
    Order.belongsTo(models.store, {
      foreignKey: 'storeId',
    })
    Order.belongsTo(models.orderstatus, {
      foreignKey: 'orderStatusId',
    })
    Order.hasMany(models.orderdetail, {
      foreignKey: 'orderId',
    })
  }
  return Order
}
