"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Users", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.TEXT,
      },
      password: {
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
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("Users");
  },
};
