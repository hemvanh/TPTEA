'use strict'
module.exports = (sequelize, DataTypes) => {
  var Admin = sequelize.define(
    'admin',
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      roles: DataTypes.STRING,
    },
    {}
  )
  Admin.associate = function(models) {
    // associations can be defined here
  }
  return Admin
}
