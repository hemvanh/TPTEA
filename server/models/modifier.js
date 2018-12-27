'use strict'
module.exports = (sequelize, DataTypes) => {
  var Modifier = sequelize.define(
    'Modifier',
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      groupTitle: DataTypes.STRING,
      groupType: DataTypes.STRING,
    },
    {}
  )
  Modifier.associate = models => {
    // associations can be defined here
  }
  return Modifier
}
