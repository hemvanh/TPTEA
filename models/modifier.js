'use strict';

module.exports = function (sequelize, DataTypes) {
  var Modifier = sequelize.define('Modifier', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    groupTitle: DataTypes.STRING,
    groupType: DataTypes.STRING,
    isDefault: DataTypes.BOOLEAN
  }, {});
  Modifier.associate = function (models) {
    // associations can be defined here
  };
  return Modifier;
};