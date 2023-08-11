'use strict'
module.exports = (sequelize, DataTypes) => {
  var Location = sequelize.define(
    'location',
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {}
  )
  Location.associate = function(models) {
    // associations can be defined here
    Location.belongsToMany(models.menu, {through: 'menulocation', foreignHey: 'locationId'})
  }
  return Location
}
