import CustomError from "../../error";
import { EmailError } from "../../error/errors";
import { IPasswordHelper } from "../../helper/password-helper/password.type";
import eventBus from "../../utils/eventBus";
import Company from "./company.model";
import { ICompany, ICompanyService } from "./company.types";
import crypto from "crypto";

class CompanyService implements ICompanyService {
  private companyModel: typeof Company;
  private passwordHelper: IPasswordHelper;
  constructor(companyModel: typeof Company, passwordHelper: IPasswordHelper) {
    this.companyModel = companyModel;
    this.passwordHelper = passwordHelper;
  }
  async getCompanyByEmail(email: string): Promise<Company | null> {
    const company = await this.companyModel.findOne({ where: { email } });
    return company;
  }
  async createCompany(data: ICompany): Promise<Company> {
    const doesCompanyExist = await this.getCompanyByEmail(data.email);
    if (doesCompanyExist) {
      throw new CustomError("Company already exist", 400);
    }
    const hashedPassword = await this.passwordHelper.bcryptEncryption(
      data.password,
    );
    data.password = hashedPassword;
    const token = crypto.randomBytes(32).toString("hex");
    data.verification_token = token;
    const company = this.companyModel.create(data);
    const email = data.email;
    eventBus.emit("companyCreated", { email, token });
    return company;
  }
  async getAllCompany(): Promise<Company[]> {
    const company = await this.companyModel.findAll({
      attributes: { exclude: ["password"] },
    });
    return company;
  }
  async forgotPassword(email: string) {
    const applicant = await this.getCompanyByEmail(email);
    if (!applicant) {
      throw new EmailError("Email doesnot exist!");
    }
    const expire_time = new Date(Date.now() + 10 * 60 * 1000);
    const token = crypto.randomBytes(6).toString("hex");
    await this.companyModel.update(
      { forgot_password_token: token, expire_time: expire_time },
      { where: { email: email } },
    );
    eventBus.emit("forgotPasswordCompany", { email, token });
  }
}

export default CompanyService;
