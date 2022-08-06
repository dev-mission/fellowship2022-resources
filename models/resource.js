'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Resource.init(
    {
      CategoryId: DataTypes.INTEGER,
      CategoryTitle: DataTypes.STRING,
      Title: DataTypes.TEXT,
      Organization: DataTypes.TEXT,
      NavPosition: DataTypes.INTEGER,
      ShortDetails: DataTypes.TEXT,
      LongDetails: DataTypes.TEXT,
      Eligibility: DataTypes.TEXT,
      Hours: DataTypes.TEXT,
      Address: DataTypes.TEXT,
      Contact: DataTypes.TEXT,
      MainImg: DataTypes.STRING,
      SuppImg: DataTypes.STRING,
      Link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Resource',
    }
  );
  return Resource;
};
