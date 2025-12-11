import { QueryInterface, DataTypes } from "sequelize";

export = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("super_admin", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {type:DataTypes.STRING,
        defaultValue:"super_admin"
      },
      address: DataTypes.STRING,
      profilePath: {type:DataTypes.STRING,
        allowNull:true
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("super_admin");
  },
};
