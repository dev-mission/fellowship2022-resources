'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Resource);
    }
  }
  Category.init(
    {
      Name: DataTypes.STRING,
      IconBackImg: DataTypes.STRING,
      IconBackImgUrl: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.assetUrl('IconBackImg');
        },
      },
      NavBackImg: DataTypes.STRING,
      NavBackImgUrl: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.assetUrl('NavBackImg');
        },
      },
      Position: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );

  Category.afterSave(async (category, options) => {
    category.handleAssetFile('IconBackImg', options);
    category.handleAssetFile('NavBackImg', options);
  });

  return Category;
};
