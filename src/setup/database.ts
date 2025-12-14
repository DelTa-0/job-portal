import { Sequelize } from "sequelize-typescript";
import Applicants from "../module/applicants/applicants.model";
import Company from "../module/company/company.model";
import Vacancy from "../module/vacancy/vacancy.model";
import Vacancy_Applicant from "../module/vacancy_applicant/vacancy_applicant.model";
import { DB_CONFIG } from "../config/db.config";

const databaseSetup = new Sequelize({
  dialect: "postgres",
  host: DB_CONFIG.HOST||"localhost",
  port: parseInt(DB_CONFIG.PORT as string)||5432,
  username: DB_CONFIG.USERNAME,
  password: DB_CONFIG.PASSWORD,
  database: DB_CONFIG.DATABASE,
  models: [Applicants,Company,Vacancy,Vacancy_Applicant],
  logging: false,
});

export default databaseSetup;