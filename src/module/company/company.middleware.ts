import { Request, Response, NextFunction } from "express";
import { ICompanyService } from "./company.types";

class CompanyMiddleware {
  private companyServices: ICompanyService;
  constructor(companyServices: ICompanyService) {
    this.companyServices = companyServices;
  }
  companyAlreadyExist = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const email = req.body.email;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const alreadyExist = await this.companyServices.getCompanyByEmail(email);
      if (alreadyExist) {
        return res.status(400).json({
          message: "Company already exists",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

export default CompanyMiddleware;
