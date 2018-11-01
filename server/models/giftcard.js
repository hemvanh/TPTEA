'use strict'
module.exports = (sequelize, DataTypes) => {
  var GiftCard = sequelize.define(
    'GiftCard',
    {
      code: DataTypes.STRING,
      customerId: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      expiry: DataTypes.INTEGER,
    },
    {}
  )
  GiftCard.associate = function(models) {
    // associations can be defined here
    GiftCard.belongsTo(models.Customer)
  }
  return GiftCard
}
