"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Posts", {
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
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("Posts");
  },
};
