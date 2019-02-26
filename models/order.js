'use strict';

module.exports = function (sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    customerId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER,
    isStorePickUp: DataTypes.BOOLEAN,
    receivingTime: DataTypes.DATE,
    deliveryAddress: DataTypes.STRING(500),
    deliveryContact: DataTypes.STRING(50),
    totalAmount: DataTypes.FLOAT,
    orderStatusId: DataTypes.INTEGER
  }, {});
  Order.associate = function (models) {
    // associations can be defined here
    Order.belongsTo(models.Customer, {
      foreignKey: 'customerId'
    });
    Order.belongsTo(models.Store, {
      foreignKey: 'storeId'
    });
    Order.belongsTo(models.OrderStatus, {
      foreignKey: 'orderStatusId'
    });
    Order.hasMany(models.OrderDetail, {
      foreignKey: 'orderId'
    });
  };
  return Order;
};