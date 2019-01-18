'use strict'
module.exports = (sequelize, DataTypes) => {
  const Stores = sequelize.define(
    'Stores',
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      addressGmap: DataTypes.STRING,
      phone: DataTypes.STRING,
      lat: DataTypes.FLOAT,
      lng: DataTypes.FLOAT,
      city: DataTypes.STRING,
      nation: DataTypes.STRING,
    },
    {}
  )
  Stores.associate = function(models) {
    // associations can be defined here
    Stores.hasMany(models.Order, {
      foreignKey: 'storeId',
    })
  }
  return Stores
}
