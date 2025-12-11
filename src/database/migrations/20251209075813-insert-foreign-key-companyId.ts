import { QueryInterface, DataTypes } from "sequelize";

export = {
  async up(queryInterface:QueryInterface) {
            await queryInterface.changeColumn('company', 'company_id', {
              type: DataTypes.INTEGER, 
              allowNull:false,
              references:{
                model:"vacancy",
                key:"id"
              },
              onUpdate:'CASCADE',
              onDelete:'CASCADE'
            });
          },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("company",'company_id',{
    });
  },
};
