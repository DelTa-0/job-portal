export type IVacancy_Applicant={
    vacancy_id:string,
    applicant_id:number,
}


export type IVacancy_ApplicantCreationAttributes=Omit<IVacancy_Applicant,"id">