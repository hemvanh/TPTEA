'use strict';

module.exports = function (sequelize, DataTypes) {
  var menulocation = sequelize.define('menulocation', {
    menuId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER
  }, {});
  menulocation.associate = function (models) {
    // associations can be defined here
  };
  return menulocation;
};