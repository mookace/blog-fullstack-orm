module.exports = {
  up(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.addColumn("Posts", "cat", {
        type: DataTypes.TEXT,
        allowNull: true,
      }),
    ]);
  },

  down(queryInterface, DataTypes) {
    // logic for reverting the changes
    return Promise.all([queryInterface.removeColumn("Posts", "cat")]);
  },
};
