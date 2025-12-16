"use strict";
const sequelize_1 = require("sequelize");
module.exports = {
    async up(queryInterface) {
        await Promise.all([
            queryInterface.addColumn("applicants", "expire_time", {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            }),
            queryInterface.addColumn("applicants", "forgot_password_token", {
                type: sequelize_1.DataTypes.STRING,
            }),
        ]);
    },
    async down(queryInterface) {
        await Promise.all([
            queryInterface.removeColumn("applicants", "expire_time", {}),
            queryInterface.removeColumn("applicants", "forgot_password_token", {}),
        ]);
    },
};
