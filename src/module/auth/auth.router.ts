import { Router } from "express";
import { authController } from ".";


const authRouter=Router();


    authRouter.post("/applicant",authController.loginAsApplicant.bind(authController));
    authRouter.post("/company",authController.loginAsCompany.bind(authController));

export default authRouter