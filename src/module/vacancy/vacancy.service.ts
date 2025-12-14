import Applicants from "../applicants/applicants.model";
import Company from "../company/company.model";
import Vacancy from "./vacancy.model";
import { IVacancy, IVacancyService } from "./vacancy.type";
import {Op} from 'sequelize'
class VacancyService implements IVacancyService{
    private vacancyModel:typeof Vacancy;
    constructor(vacancyModel:typeof Vacancy){
        this.vacancyModel=vacancyModel;
    }
    async createVacancy(data:IVacancy):Promise<IVacancy>{
        return this.vacancyModel.create(data);
    }
    async getAllVacancy():Promise<IVacancy[]>{
        return await this.vacancyModel.findAll();
    }
    async getAllVacancyByCompany(company_id:number):Promise<IVacancy[]>{
        return await this.vacancyModel.findAll({where:{companyId:company_id}})
    }
    async checkIfVacancyByCompany(vacancyId:string,companyId:number):Promise<IVacancy|null>{
        const isVacancyByCompany=await this.vacancyModel.findOne({where:{id:vacancyId},
        include:[{
            model:Company,
            where:{id:companyId} 
        }]
        })
        return isVacancyByCompany;
    }
    async getAllApplicant(vacancyId:string):Promise<any>{
    const vacancies = await this.vacancyModel.findAll({
      where: { id:vacancyId },
      include: [
        {
          model: Applicants,
          through: { attributes: [] }, 
          attributes: ["id", "name", "email","cvPath"], 
        },
      ],
    });
    return vacancies;
    }
    async searchVacancy(name:string):Promise<IVacancy[]>{
        const vacancies=await this.vacancyModel.findAll({where:{
            name:{[Op.like]:`%${name}%`},
        }})
        return vacancies;
    }
}

export default VacancyService