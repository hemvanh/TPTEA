'use strict';

module.exports = function (sequelize, DataTypes) {
  var Store = sequelize.define('Store', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    gmapAddress: DataTypes.STRING,
    phone: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    city: DataTypes.STRING,
    nation: DataTypes.STRING
  }, {});
  Store.associate = function (models) {
    // associations can be defined here
    Store.hasMany(models.Order, {
      foreignKey: 'storeId'
    });
  };
  return Store;
};