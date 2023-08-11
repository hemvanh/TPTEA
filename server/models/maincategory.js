'use strict'
module.exports = (sequelize, DataTypes) => {
  var MainCategory = sequelize.define(
    'maincategory',
    {
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
      img: DataTypes.STRING,
    },
    {}
  )
  MainCategory.associate = models => {
    // associations can be defined here
    MainCategory.hasMany(models.category, {
      foreignKey: 'mainCategoryId',
    })
  }
  return MainCategory
}
