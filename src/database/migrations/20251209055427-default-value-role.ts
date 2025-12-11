import { QueryInterface, DataTypes } from "sequelize";

export = {
  async up(queryInterface:QueryInterface) {
            await queryInterface.changeColumn('applicants', 'role', {
              type: DataTypes.STRING, 
              defaultValue:"applicant"
            });
          },

  async down(queryInterface: QueryInterface) {
    await queryInterface.changeColumn("company",'role',{
      type:DataTypes.STRING
    });
  },
};
