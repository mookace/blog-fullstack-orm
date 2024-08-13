"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Skill.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
      });
    }
  }
  Skill.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userSkills: {
        type: DataTypes.TEXT,
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
      userId: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "Skill",
    }
  );

  return Skill;
};
