'use strict'
module.exports = (sequelize, DataTypes) => {
  var Menu = sequelize.define(
    'menu',
    {
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
      price: DataTypes.STRING,
      img: DataTypes.STRING,
    },
    {}
  )
  Menu.associate = function(models) {
    // associations can be defined here
    Menu.hasMany(models.orderdetail, {
      foreignKey: 'menuId',
    })
    Menu.belongsToMany(models.location, {
      through: 'menulocation',
      foreignKey: 'menuId',
    })
    Menu.belongsToMany(models.modifier, {
      through: 'menumodifier',
      foreignKey: 'menuId',
    })
  }
  return Menu
}
