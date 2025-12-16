import { QueryInterface, DataTypes } from "sequelize";

export = {
  async up(queryInterface:QueryInterface) {
            await Promise.all([
             queryInterface.addColumn('company', 'verified', {
              type: DataTypes.BOOLEAN, 
              defaultValue:false,
            }),
            queryInterface.addColumn('company', 'verification_token', {
              type: DataTypes.STRING, 
            })
            ])
          },
          

  async down(queryInterface: QueryInterface) {
    await Promise.all([
     queryInterface.removeColumn("company",'verified',{
    }),
    queryInterface.removeColumn("company",'verification_link',{
    })
    ])
  },
};
