import { QueryInterface, DataTypes } from "sequelize";

export = {
  async up(queryInterface:QueryInterface) {
            await Promise.all([
             queryInterface.addColumn('applicants', 'verified', {
              type: DataTypes.BOOLEAN, 
              defaultValue:false,
            }),
            queryInterface.addColumn('applicants', 'verification_token', {
              type: DataTypes.STRING, 
            })
            ])
          },
          

  async down(queryInterface: QueryInterface) {
    await Promise.all([
     queryInterface.removeColumn("applicants",'verified',{
    }),
    queryInterface.removeColumn("applicants",'verification_link',{
    })
    ])
  },
};
