import CustomError from "../../error";
import { IPasswordHelper } from "../../helper/passwordHelper/password.type";
import { IVacancy } from "../vacancy/vacancy.type";
import Vacancy_Applicant from "../vacancy_applicant/vacancy_applicant.model";
import { IVacancy_Applicant } from "../vacancy_applicant/vacancy_applicant.type";
import Applicants from "./applicants.model"
import { IApplicants, IApplicantsService } from "./applicants.types";

class ApplicantsService implements IApplicantsService{
    private vacancyApplicantModel:typeof Vacancy_Applicant;
    private applicantModel:typeof Applicants;
    private passwordHelper:IPasswordHelper;
    constructor(applicantModel:typeof Applicants,passwordHelper:IPasswordHelper,vacancyApplicantModel:typeof Vacancy_Applicant){
        this.applicantModel=applicantModel;
        this.passwordHelper=passwordHelper;
        this.vacancyApplicantModel=vacancyApplicantModel;
    }
    async getAllApplicants():Promise<Applicants[]|null>{
        const applicants=this.applicantModel.findAll();
        return applicants;
    }

    async getApplicantByEmail(email:string):Promise<Applicants|null>{
        const applicant=await this.applicantModel.findOne({where:{email:email}});
        return applicant;
    }
    async getApplicantById(id:number):Promise<Applicants|null>{
        const applicant=await this.applicantModel.findOne({where:{id:id}});
        return applicant;
    }

    async createApplicant(data:IApplicants):Promise<Applicants>{
        const applicantExist=await this.getApplicantByEmail(data.email);
        if(applicantExist){
            throw new CustomError("account already exists",400)
            
        }
        const hashedPassword=await this.passwordHelper.bcryptEncryption(data.password);
        data.password=hashedPassword
        const applicant=await this.applicantModel.create(data)
        return applicant
        
    }
    async alreadyApplied(vacancy_id:string,applicantId:number):Promise<IVacancy_Applicant|null>{
        const applied= await this.vacancyApplicantModel.findOne({where:{vacancy_id,applicant_id:applicantId}});
        return applied;
    }
    async applyVacancy(data:IVacancy_Applicant):Promise<Vacancy_Applicant>{
        const vacancy=await this.vacancyApplicantModel.create(data);
        return vacancy;
    }
    async getAppliedVacancies(applicant_id:number):Promise<IVacancy_Applicant[]>{
        return await this.vacancyApplicantModel.findAll({where:{applicant_id}})
    }
}

export default ApplicantsService