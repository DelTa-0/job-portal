import { QueryInterface, DataTypes } from "sequelize";

export = {
  async up(queryInterface:QueryInterface) {
            await Promise.all([
             
            queryInterface.addColumn('applicants', 'forgot_password_token', {
              type: DataTypes.STRING, 
            })
            ])
          },
          

  async down(queryInterface: QueryInterface) {
    await Promise.all([
    
    queryInterface.removeColumn("applicants",'forgot_password_token',{
    })
    ])
  },
};
