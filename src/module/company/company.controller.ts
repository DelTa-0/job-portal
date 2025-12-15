import BaseController from "../base/base.controller";
import { ICompanyService } from "./company.types";
import { Request, Response, NextFunction } from "express";
import { saveFile } from "../../helper/file-helper/file.helper";
import { ensureUploadsFolder } from "../../utils/ensureUploads";
import path from "path";
import CustomError from "../../error";
class CompanyController extends BaseController {
  private companyService: ICompanyService;
  constructor(companyService: ICompanyService) {
    super();
    this.companyService = companyService;
  }
  async createCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const file = req.file;
      const profilePath = file?.originalname
        ? path.join(ensureUploadsFolder(), file.originalname)
        : null;
      data.profilePath = profilePath as string;
      if (file) {
        saveFile(file);
      }
      if (!data) {
        this.sendReponse(res, 400, "Enter all fields");
      }
      const company = await this.companyService.createCompany(data);
      this.sendReponse(
        res,
        200,
        "Company created successfully! Verify your email to login",
        company,
      );
    } catch (err) {
      next(err);
    }
  }
  async getAllCompany(req: Request, res: Response) {
    const company = await this.companyService.getAllCompany();
    this.sendReponse(res, 200, "All companies:", company);
  }
  getProfile = async (req: Request, res: Response) => {
    const email = req.payload.email;
    const user = await this.companyService.getCompanyByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found!" });
    if (user.profilePath) {
      const fileName = path.basename(user.profilePath);
      const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
      this.sendReponse(res, 200, "Company details:", {
        ...user.toJSON(),
        avatarUrl,
      });
    } else {
      throw new CustomError("Company doesnot have profile!", 400);
    }
  };
  forgetPassword = async (req: Request, res: Response) => {
    const email = req.body.email;
    await this.companyService.forgotPassword(email);
    this.sendReponse(res, 200, "Verification link has been sent!");
  };
}

export default CompanyController;
