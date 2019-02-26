'use strict';

module.exports = function (sequelize, DataTypes) {
  var PushSubscription = sequelize.define('PushSubscription', {
    endpoint: DataTypes.STRING,
    p256dh: DataTypes.STRING,
    auth: DataTypes.STRING
  }, {});
  PushSubscription.associate = function (models) {
    // associations can be defined here
  };
  return PushSubscription;
};