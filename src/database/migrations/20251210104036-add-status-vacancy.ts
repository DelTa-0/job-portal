import { QueryInterface, DataTypes } from "sequelize";

export = {
  async up(queryInterface:QueryInterface) {
            await queryInterface.changeColumn('vacancy_applicant', 'vacancy_id', {
              type: DataTypes.STRING, 
              
            });
          },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("vacancy_applicant",'vacancy_id'
     
    );
  },
};
