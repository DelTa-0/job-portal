import { QueryInterface, DataTypes } from "sequelize";

export = {
  async up(queryInterface: QueryInterface) {
    await Promise.all([
      queryInterface.addColumn("company", "expire_time", {
        type: DataTypes.DATE,
        allowNull: true,
      }),
      queryInterface.addColumn("company", "forgot_password_token", {
        type: DataTypes.STRING,
      }),
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await Promise.all([
      queryInterface.removeColumn("company", "expire_time", {}),
      queryInterface.removeColumn("company", "forgot_password_token", {}),
    ]);
  },
};
