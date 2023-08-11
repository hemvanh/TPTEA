'use strict'
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define(
    'store',
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      gmapAddress: DataTypes.STRING,
      phone: DataTypes.STRING,
      lat: DataTypes.FLOAT,
      lng: DataTypes.FLOAT,
      city: DataTypes.STRING,
      nation: DataTypes.STRING,
    },
    {}
  )
  Store.associate = function(models) {
    // associations can be defined here
    Store.hasMany(models.order, {
      foreignKey: 'storeId',
    })
  }
  return Store
}
