'use strict'
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define(
    'category',
    {
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
      img: DataTypes.STRING,
    },
    {}
  )
  Category.associate = models => {
    // associations can be defined here
    Category.hasMany(models.menu, {
      foreignKey: 'categoryId',
    })
  }
  return Category
}
