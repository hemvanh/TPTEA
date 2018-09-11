'use strict'
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define(
    'Category',
    {
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
      img: DataTypes.STRING,
    },
    {}
  )
  Category.associate = function(models) {
    // associations can be defined here
  }
  return Category
}
