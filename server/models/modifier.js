'use strict'
module.exports = (sequelize, DataTypes) => {
  var Modifier = sequelize.define(
    'modifier',
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      groupTitle: DataTypes.STRING,
      groupType: DataTypes.STRING,
      isDefault: DataTypes.BOOLEAN,
    },
    {}
  )
  Modifier.associate = models => {
    // associations can be defined here
  }
  return Modifier
}
