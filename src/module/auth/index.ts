import { jwtHelper } from "../../helper/jwt-helper";
import { passwordHelper } from "../../helper/password-helper";
import { applicantsService } from "../applicants";
import { companyService } from "../company";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";

const authService=new AuthService(jwtHelper,passwordHelper,applicantsService,companyService);

const authController=new AuthController(authService);

export {
    authService,authController
}