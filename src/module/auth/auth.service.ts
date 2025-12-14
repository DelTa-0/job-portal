import CustomError from "../../error";
import { IJWTHelper } from "../../helper/jwt-helper/jwt.type";
import { IPasswordHelper } from "../../helper/password-helper/password.type";
import { IApplicantsService } from "../applicants/applicants.types";
import { ICompanyService } from "../company/company.types";
import { IAuthService } from "./auth.type";
import { Response } from "express";

class AuthService implements IAuthService{
    private jwtHelper: IJWTHelper;
    private passwordHelper:IPasswordHelper;
    private applicantService:IApplicantsService;
    private companyService:ICompanyService;
    constructor(jwtHelper: IJWTHelper,
        passwordHelper:IPasswordHelper,
        applicantService:IApplicantsService,
        companyService:ICompanyService
    ) {
        this.jwtHelper=jwtHelper;
        this.passwordHelper=passwordHelper;
        this.applicantService=applicantService;
        this.companyService=companyService;
    }
    async loginAsApplicant(res:Response,email:string,password:string):Promise<void>{
        const applicant=await this.applicantService.getApplicantByEmail(email);
        const user=applicant;
        if(!user){
            throw new CustomError("Email doesnot exist!",400)
        }
        const verifiedUser=await this.passwordHelper.bcryptCompare(password,user.password);
        if(!verifiedUser){
            throw new CustomError("Password invalid!",400)
        }
        const payload={
            id:user.id,
            email:user.email,
            role:user.role
        }
        const accessToken=await this.jwtHelper.createToken(payload);
        res.cookie("accessToken",accessToken)

    }
    async loginAsCompany(res:Response,email:string,password:string):Promise<void>{
        const company=await this.companyService.getCompanyByEmail(email);   
        const user=company;
        if(!user){
            throw new CustomError("Email doesnot exist!",400)
        }
        const hashedPassword=user.getDataValue("password")
        const verifiedUser=await this.passwordHelper.bcryptCompare(password,hashedPassword);
        if(!verifiedUser){
            throw new CustomError("Password invalid!",400)
        }
        const payload={
            id:user.id,
            email:user.email,
            role:user.role
        }
        const accessToken=await this.jwtHelper.createToken(payload);
        res.cookie("accessToken",accessToken)

    }
}
export default AuthService