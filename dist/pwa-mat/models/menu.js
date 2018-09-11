'use strict';

module.exports = function (sequelize, DataTypes) {
  var Menu = sequelize.define('Menu', {
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    price: DataTypes.STRING,
    pic: DataTypes.STRING
  }, {});
  Menu.associate = function (models) {
    // associations can be defined here
    Menu.hasMany(models.OrderDetail, {
      foreignKey: 'menuId'
    });
    Menu.belongsToMany(models.Location, {
      through: 'MenuLocation',
      foreignKey: 'menuId'
    });
  };
  return Menu;
};