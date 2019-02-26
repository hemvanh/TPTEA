'use strict';

module.exports = function (sequelize, DataTypes) {
  var OrderDetail = sequelize.define('OrderDetail', {
    orderId: DataTypes.INTEGER,
    menuId: DataTypes.INTEGER,
    modifierIds: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT
  }, {});
  OrderDetail.associate = function (models) {
    // associations can be defined here
    OrderDetail.belongsTo(models.Menu, {
      foreignKey: 'menuId'
    });
    OrderDetail.belongsTo(models.Order, {
      foreignKey: 'orderId'
    });
  };
  return OrderDetail;
};