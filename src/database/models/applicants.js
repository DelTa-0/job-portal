'use strict';
const {
  Model,
  ENUM
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    skills: DataTypes.STRING,
    role:DataTypes.ENUM,
    address:DataTypes.STRING,
    profilePath:DataTypes.STRING,
    cvPath:DataTypes.STRING

  }, {
    sequelize,
    modelName: 'applicants',
  });
  return User;
};