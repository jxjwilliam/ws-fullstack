const { Model } = require('sequelize')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  class Single extends Model {
    static associate(models) {}
  }
  Single.init(
    {
      name: DataTypes.STRING,
      fieldname: DataTypes.STRING,
      mimetype: DataTypes.STRING,
      path: DataTypes.STRING,
      size: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get() {
          return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD')
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
        get() {
          return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD')
        },
      },
    },
    {
      sequelize,
      modelName: 'Single',
      timestamps: true,
      underscored: true,
    },
  )
  return Single
}
