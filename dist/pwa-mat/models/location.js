'use strict';

module.exports = function (sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    code: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  Location.associate = function (models) {
    // associations can be defined here
    Location.belongsToMany(models.Menu, { through: 'menulocation', foreignHey: 'locationId' });
  };
  return Location;
};