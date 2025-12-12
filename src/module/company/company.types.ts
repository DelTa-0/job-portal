import { ERole } from "../auth/auth.type";
import Vacancy_Applicant from "../vacancy_applicant/vacancy_applicant.model";
import Company from "./company.model";

export type ICompanyCreationAttributes = Omit<
  ICompany,
  "id" | "createdAt" | "updatedAt"
>;


export type ICompany={
   id:number,
   name:string,
   email:string,
   password:string,
   address:string,
   profilePath:string,
   role:ERole,
   verified:boolean,
   verification_token:string|null,
   forgot_password_token:string|null;
   expire_time?:Date|null;
   createdAt:Date,
   updatedAt:Date,
}

export interface ICompanyService{
  getCompanyByEmail(email:string):Promise<Company|null>
  createCompany(data:ICompany):Promise<Company>;
  getAllCompany():Promise<Company[]>;
  forgotPassword(email:string):any;

}
