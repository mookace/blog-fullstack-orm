"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Posts.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
      });

      models.User.hasMany(Posts, {
        as: "posts",
        foreignKey: "userId",
      });
    }
  }
  Posts.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.TEXT,
      },
      desc: {
        type: DataTypes.TEXT,
      },
      img: {
        type: DataTypes.TEXT,
      },
      cat: {
        type: DataTypes.TEXT,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );
  return Posts;
};
