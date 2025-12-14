export type IVacancyCreationAttributes = Omit<
  IVacancy,
  "id" | "createdAt" | "updatedAt"
>;
export type IVacancy={
    id:number,
    name:string,
    description:string,
    companyId:number
}
export interface IVacancyService{
    createVacancy(data:IVacancy):Promise<IVacancy>;
    getAllVacancy():Promise<IVacancy[]>;
    getAllVacancyByCompany(company_id:number):Promise<IVacancy[]>;
    getAllApplicant(vacancyId:string):Promise<IVacancy>;
    checkIfVacancyByCompany(vacancyId:string,companyId:number):Promise<IVacancy|null>;
    searchVacancy(name:any):Promise<IVacancy[]>;
}