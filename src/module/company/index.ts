import { passwordHelper } from "../../helper/password-helper";
import CompanyController from "./company.controller";
import CompanyMiddleware from "./company.middleware";
import Company from "./company.model";
import CompanyService from "./company.service";

const companyService = new CompanyService(Company, passwordHelper);
const companyMiddleware = new CompanyMiddleware(companyService);
const companyController = new CompanyController(companyService);

export { companyService, companyController, companyMiddleware };
