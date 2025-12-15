import { jwtHelper } from "../../helper/jwt-helper";
import { passwordHelper } from "../../helper/password-helper";
import Applicants from "../applicants/applicants.model";
import Company from "../company/company.model";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";

const authService=new AuthService(jwtHelper,passwordHelper,Applicants,Company);

const authController=new AuthController(authService);

export {
    authService,authController
}