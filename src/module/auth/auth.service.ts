import CustomError from "../../error";
import { IJWTHelper } from "../../helper/jwt-helper/jwt.type";
import { IPasswordHelper } from "../../helper/password-helper/password.type";
import Applicants from "../applicants/applicants.model";
import Company from "../company/company.model";
import { IAuthService } from "./auth.type";
import { Response } from "express";

class AuthService implements IAuthService {
  private jwtHelper: IJWTHelper;
  private passwordHelper: IPasswordHelper;
  private applicantModel: typeof Applicants;
  private companyModel: typeof Company;
  constructor(
    jwtHelper: IJWTHelper,
    passwordHelper: IPasswordHelper,
    applicantModel: typeof Applicants,
    companyModel: typeof Company,
  ) {
    this.jwtHelper = jwtHelper;
    this.passwordHelper = passwordHelper;
    this.applicantModel = applicantModel;
    this.companyModel = companyModel;
  }
  async loginAsApplicant(
    res: Response,
    email: string,
    password: string,
  ): Promise<void> {
    const applicant = await this.applicantModel
      .scope("withPassword")
      .findOne({ where: { email } });
    const user = applicant;
    if (!user) {
      throw new CustomError("Email doesnot exist!", 400);
    }
    if (!user.verified) {
      throw new CustomError("Confirm your email address", 400);
    }
    const verifiedUser = await this.passwordHelper.bcryptCompare(
      password,
      user.password,
    );
    if (!verifiedUser) {
      throw new CustomError("Password invalid!", 400);
    }
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const accessToken = await this.jwtHelper.createToken(payload);
    res.cookie("accessToken", accessToken);
  }
  async loginAsCompany(
    res: Response,
    email: string,
    password: string,
  ): Promise<void> {
    const company = await this.companyModel
      .scope("withPassword")
      .findOne({ where: { email } });
    const user = company;
    if (!user) {
      throw new CustomError("Email doesnot exist!", 400);
    }
    if (!user.verified) {
      throw new CustomError("Confirm your email address", 400);
    }
    const hashedPassword = user.getDataValue("password");
    const verifiedUser = await this.passwordHelper.bcryptCompare(
      password,
      hashedPassword,
    );
    if (!verifiedUser) {
      throw new CustomError("Password invalid!", 400);
    }
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const accessToken = await this.jwtHelper.createToken(payload);
    res.cookie("accessToken", accessToken);
  }
}
export default AuthService;
