'use strict'
module.exports = (sequelize, DataTypes) => {
  var OrderDetail = sequelize.define(
    'orderdetail',
    {
      orderId: DataTypes.INTEGER,
      menuId: DataTypes.INTEGER,
      modifierIds: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
    },
    {}
  )
  OrderDetail.associate = function(models) {
    // associations can be defined here
    OrderDetail.belongsTo(models.menu, {
      foreignKey: 'menuId',
    })
    OrderDetail.belongsTo(models.order, {
      foreignKey: 'orderId',
    })
  }
  return OrderDetail
}
