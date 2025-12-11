import CustomError from "../../error";
import { IPasswordHelper } from "../../helper/passwordHelper/password.type";
import Company from "./company.model";
import { ICompany, ICompanyService } from "./company.types";

class CompanyService implements ICompanyService{
    private companyModel:typeof Company;
    private passwordHelper:IPasswordHelper
    constructor(companyModel:typeof Company,passwordHelper:IPasswordHelper) {
        this.companyModel=companyModel; 
        this.passwordHelper=passwordHelper;
    }
    async getCompanyByEmail(email:string):Promise<Company|null>{
        const company=await this.companyModel.findOne({where:{email}})
        return company;
    }
    async createCompany(data:ICompany):Promise<Company>{
        const doesCompanyExist=await this.getCompanyByEmail(data.email)
        if(doesCompanyExist){
            throw new CustomError("company already exist",400);
        }
        const hashedPassword=await this.passwordHelper.bcryptEncryption(data.password)
        data.password=hashedPassword
        const company=this.companyModel.create(data)
        return company;
        }
    async getAllCompany():Promise<Company[]>{
        const company= await this.companyModel.findAll({attributes:{exclude:['password']}});
        return company;
    }
  
    
}

export default CompanyService