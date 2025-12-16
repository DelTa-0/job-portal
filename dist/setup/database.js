"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const applicants_model_1 = __importDefault(require("../module/applicants/applicants.model"));
const company_model_1 = __importDefault(require("../module/company/company.model"));
const vacancy_model_1 = __importDefault(require("../module/vacancy/vacancy.model"));
const vacancy_applicant_model_1 = __importDefault(require("../module/vacancy_applicant/vacancy_applicant.model"));
const db_config_1 = require("../config/db.config");
const databaseSetup = new sequelize_typescript_1.Sequelize({
    dialect: "postgres",
    host: db_config_1.DB_CONFIG.HOST || "localhost",
    port: parseInt(db_config_1.DB_CONFIG.PORT) || 5432,
    username: db_config_1.DB_CONFIG.USERNAME,
    password: db_config_1.DB_CONFIG.PASSWORD,
    database: db_config_1.DB_CONFIG.DATABASE,
    models: [applicants_model_1.default, company_model_1.default, vacancy_model_1.default, vacancy_applicant_model_1.default],
    logging: false,
});
exports.default = databaseSetup;
