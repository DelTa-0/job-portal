"use strict";
const sequelize_1 = require("sequelize");
module.exports = {
    async up(queryInterface) {
        await Promise.all([
            queryInterface.addColumn('applicants', 'verified', {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false,
            }),
            queryInterface.addColumn('applicants', 'verification_token', {
                type: sequelize_1.DataTypes.STRING,
            })
        ]);
    },
    async down(queryInterface) {
        await Promise.all([
            queryInterface.removeColumn("applicants", 'verified', {}),
            queryInterface.removeColumn("applicants", 'verification_link', {})
        ]);
    },
};
