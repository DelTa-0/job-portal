import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('super_admin', [
      {
        name: 'admin',
        email: 'admin@gmail.com',
        password:'admin',
        role:'super_admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface: QueryInterface)=> {
    return queryInterface.bulkDelete('super_admin', {});
  }
};
