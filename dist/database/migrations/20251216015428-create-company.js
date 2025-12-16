"use strict";
const sequelize_1 = require("sequelize");
module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable("company", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: sequelize_1.DataTypes.STRING,
            email: sequelize_1.DataTypes.STRING,
            password: sequelize_1.DataTypes.STRING,
            role: { type: sequelize_1.DataTypes.STRING, defaultValue: "company" },
            address: sequelize_1.DataTypes.STRING,
            profilePath: { type: sequelize_1.DataTypes.STRING, allowNull: true },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable("company");
    },
};
