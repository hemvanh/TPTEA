'use strict'
module.exports = (sequelize, DataTypes) => {
  var Customer = sequelize.define(
    'customer',
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      balance: DataTypes.FLOAT,
      points: DataTypes.INTEGER,
      type: DataTypes.STRING,
    },
    {}
  )
  Customer.associate = function(models) {
    // associations can be defined here
    Customer.hasMany(models.order, {
      foreignKey: 'customerId',
    })
    Customer.hasMany(models.giftcard, {
      foreignKey: 'customerId',
    })
  }
  return Customer
}
