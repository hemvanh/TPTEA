'use strict';

module.exports = function (sequelize, DataTypes) {
  var MainCategory = sequelize.define('MainCategory', {
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    img: DataTypes.STRING
  }, {});
  MainCategory.associate = function (models) {
    // associations can be defined here
    MainCategory.hasMany(models.Category, {
      foreignKey: 'mainCategoryId'
    });
  };
  return MainCategory;
};