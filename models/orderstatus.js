'use strict';

module.exports = function (sequelize, DataTypes) {
  var OrderStatus = sequelize.define('OrderStatus', {
    name: DataTypes.STRING(20),
    notes: DataTypes.STRING(200)
  }, {});
  OrderStatus.associate = function (models) {
    // associations can be defined here
  };
  return OrderStatus;
};