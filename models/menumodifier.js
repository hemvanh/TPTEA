'use strict';

module.exports = function (sequelize, DataTypes) {
  var MenuModifier = sequelize.define('MenuModifier', {
    menuId: DataTypes.INTEGER,
    modifierId: DataTypes.INTEGER
  }, {});
  MenuModifier.associate = function (models) {
    // associations can be defined here
  };
  return MenuModifier;
};