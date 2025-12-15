import { Request, Response, NextFunction } from "express";
import { IAuthService } from "./auth.type";
import BaseController from "../base/base.controller";
import {
  forgotPasswordAppliacnt,
  forgotPasswordCompany,
  verifyEmailServiceApplicant,
  verifyEmailServiceCompany,
} from "../../helper/mail-helper/mail.helper";
import { EmailError } from "../../error/errors";

class AuthController extends BaseController {
  private authService: IAuthService;
  constructor(authService: IAuthService) {
    super();
    this.authService = authService;
  }

  async loginAsApplicant(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data = await this.authService.loginAsApplicant(
        res,
        req.body.email,
        req.body.password,
      );
      this.sendReponse(res, 200, "Logged in successfully!", data);
    } catch (err) {
      next(err);
    }
  }
  async loginAsCompany(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data = await this.authService.loginAsCompany(
        res,
        req.body.email,
        req.body.password,
      );
      this.sendReponse(res, 200, "Logged in successfully!", data);
    } catch (err) {
      next(err);
    }
  }
  async verifyEmailCompany(req: Request, res: Response) {
    try {
      const token = req.query.token as string;
      await verifyEmailServiceCompany(token);
      this.sendReponse(res, 200, "Email verified! Log in");
    } catch (err) {
      throw new EmailError("Some error while verifying");
    }
  }
  async verifyEmailApplicant(req: Request, res: Response) {
    try {
      const token = req.query.token as string;
      await verifyEmailServiceApplicant(token);
      this.sendReponse(res, 200, "Email verified! Log in");
    } catch (err) {
      throw new EmailError("Some error while verifying");
    }
  }
  async verifyPasswordApplicant(req: Request, res: Response) {
    try {
      const token = req.query.token as string;
      await forgotPasswordAppliacnt(token);
      this.sendReponse(res, 200, "Verified! Enter new password");
    } catch (err) {
      throw new EmailError("Token expired!");
    }
  }
  async verifyPasswordCompany(req: Request, res: Response) {
    try {
      const token = req.query.token as string;
      await forgotPasswordCompany(token);
      this.sendReponse(res, 200, "Verified! Enter new password");
      //redirect to company/update route
    } catch (err) {
      throw new EmailError("Token expired!");
    }
  }
}
export default AuthController;
