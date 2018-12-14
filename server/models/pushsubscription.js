'use strict'
module.exports = (sequelize, DataTypes) => {
  const PushSubscription = sequelize.define(
    'PushSubscription',
    {
      endpoint: DataTypes.STRING,
      p256dh: DataTypes.STRING,
      auth: DataTypes.STRING,
    },
    {}
  )
  PushSubscription.associate = models => {
    // associations can be defined here
  }
  return PushSubscription
}
