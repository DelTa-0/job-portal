import { Response } from "express";
export interface IAuthService {
  loginAsApplicant(
    res: Response,
    email: string,
    password: string,
  ): Promise<void>;
  loginAsCompany(res: Response, email: string, password: string): Promise<void>;
}
export enum ERole {
  APPLICANT = "applicant",
  COMPANY = "company",
  SUPER_ADMIN = "super_admin",
}
