'use strict'
module.exports = (sequelize, DataTypes) => {
  var MenuModifier = sequelize.define(
    'menumodifier',
    {
      menuId: DataTypes.INTEGER,
      modifierId: DataTypes.INTEGER,
    },
    {}
  )
  MenuModifier.associate = models => {
    // associations can be defined here
  }
  return MenuModifier
}
