import { Router } from "express";
import { authController } from ".";
const authRouter = Router();

authRouter.post(
  "/applicant",
  authController.loginAsApplicant.bind(authController),
);
authRouter.post("/company", authController.loginAsCompany.bind(authController));
authRouter.get(
  "/company/verify-email",
  authController.verifyEmailCompany.bind(authController),
);
authRouter.get(
  "/applicant/verify-email",
  authController.verifyEmailApplicant.bind(authController),
);
authRouter.get(
  "/applicant/forgot-password",
  authController.verifyPasswordApplicant.bind(authController),
);
authRouter.get(
  "/company/forgot-password",
  authController.verifyPasswordCompany.bind(authController),
);

export default authRouter;
