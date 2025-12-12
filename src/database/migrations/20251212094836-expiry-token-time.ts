import { QueryInterface, DataTypes } from "sequelize";

export = {
  async up(queryInterface:QueryInterface) {
            await Promise.all([
             
            queryInterface.addColumn('applicants', 'expire_time', {
              type: DataTypes.DATE, 
              allowNull:true
            })
            ])
          },
          

  async down(queryInterface: QueryInterface) {
    await Promise.all([
    
    queryInterface.removeColumn("applicants",'expire_time',{
    })
    ])
  },
};
