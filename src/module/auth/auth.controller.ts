import { Request, Response, NextFunction } from "express";
import { IAuthService } from "./auth.type";
import BaseController from "../base/base.controller";

class AuthController extends BaseController{
  private authService: IAuthService;
  constructor(authService: IAuthService) {
    super();
    this.authService = authService;
  }

  async loginAsApplicant(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await this.authService.loginAsApplicant(
        res,
        req.body.email,
        req.body.password,
      );
      this.sendReponse(res,200,"logged in successfully",data);
      
    } catch (err) {
      next(err);
    }
  }
  async loginAsCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await this.authService.loginAsCompany(
        res,
        req.body.email,
        req.body.password,
      );
      this.sendReponse(res,200,"logged in successfully",data)
    } catch (err) {
      next(err);
    }
  }
  
}
export default AuthController;