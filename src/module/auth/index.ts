import { jwtHelper } from "../../helper/jwtHelper";
import { passwordHelper } from "../../helper/passwordHelper";
import { applicantsService } from "../applicants";
import Applicants from "../applicants/applicants.model";
import { companyService } from "../company";
import Company from "../company/company.model";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";

const authService=new AuthService(jwtHelper,passwordHelper,applicantsService,companyService);

const authController=new AuthController(authService);

export {
    authService,authController
}