import { Request, Response, NextFunction } from "express";
import { IApplicantsService } from "./applicants.types";

class ApplicantsMiddleware {
  private applicantService: IApplicantsService;
  constructor(applicantService: IApplicantsService) {
    this.applicantService = applicantService;
  }
  applicantAlreadyExist = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const email = req.body.email;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const alreadyExist =
        await this.applicantService.getApplicantByEmail(email);
      if (alreadyExist) {
        return res.status(400).json({
          message: "User already exists",
          data: alreadyExist,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

export default ApplicantsMiddleware;
