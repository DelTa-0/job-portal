import { Router } from "express";
import { companyController, companyMiddleware } from ".";
import { authMiddleware } from "../../middleware/authentication";
import hasRole from "../../middleware/authorization/authorization.middleware";
import { ERole } from "../auth/auth.type";
import upload from "../../config/multer.config";

const companyRouter=Router();

companyRouter.post('/',upload.single('profile'),companyMiddleware.companyAlreadyExist,companyController.createCompany.bind(companyController));
companyRouter.get('/',authMiddleware.auth,hasRole([ERole.COMPANY]),companyController.getAllCompany.bind(companyController));
companyRouter.get('/get_profile',authMiddleware.auth,hasRole([ERole.COMPANY]),companyController.getProfile.bind(companyController));
companyRouter.post('/forgot_password',companyController.forgetPassword.bind(companyController))
export default companyRouter