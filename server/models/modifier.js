'use strict'
module.exports = (sequelize, DataTypes) => {
  var Modifier = sequelize.define(
    'Modifier',
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {}
  )
  Modifier.associate = function(models) {
    // associations can be defined here
  }
  return Modifier
}
