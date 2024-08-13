module.exports = {
  up(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.addColumn("Users", "img", {
        type: DataTypes.TEXT,
        allowNull: true,
      }),
    ]);
  },

  down(queryInterface, DataTypes) {
    // logic for reverting the changes
    return Promise.all([queryInterface.removeColumn("Users", "img")]);
  },
};
