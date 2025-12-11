import { Sequelize } from "sequelize-typescript";
import Applicants from "../module/applicants/applicants.model";
import Company from "../module/company/company.model";
import Vacancy from "../module/vacancy/vacancy.model";
import Vacancy_Applicant from "../module/vacancy_applicant/vacancy_applicant.model";


const databaseSetup = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "jobportal",
  models: [Applicants,Company,Vacancy,Vacancy_Applicant],
  logging: false,
});

export default databaseSetup;