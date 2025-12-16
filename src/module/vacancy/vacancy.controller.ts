import CustomError from "../../error";
import BaseController from "../base/base.controller";
import { IVacancyService } from "./vacancy.type";
import { Request, Response } from "express";

class VacancyContoller extends BaseController {
  private vacancyService: IVacancyService;
  constructor(vacancyService: IVacancyService) {
    super();
    this.vacancyService = vacancyService;
  }
  createVacancy = async (req: Request, res: Response) => {
    const vacancy = req.body;
    const payload = req.payload;
    vacancy.companyId = payload.id;
    const newVacancy = await this.vacancyService.createVacancy(vacancy);
    this.sendReponse(res, 200, "Vacancy created successfully", newVacancy);
  };
  getAllVacancyByCompany = async (req: Request, res: Response) => {
    const companyId = req.payload.id;
    const vacancies =
      await this.vacancyService.getAllVacancyByCompany(companyId);
    this.sendReponse(res, 200, "All vacancies from company:", vacancies);
  };
  getAllVacancy = async (_req: Request, res: Response) => {
    const vacancies = await this.vacancyService.getAllVacancy();
    this.sendReponse(res, 200, "All vacancies from company:", vacancies);
  };
  getApplicantsForCompany = async (req: Request, res: Response) => {
    try {
      const vacancyId = req.params.id;
      const companyId = req.payload.id;
      const verify = await this.vacancyService.checkIfVacancyByCompany(
        vacancyId,
        companyId,
      );
      if (verify) {
        const vacancies = await this.vacancyService.getAllApplicant(vacancyId);
        this.sendReponse(res, 200, "All applicant for the vacancy:", vacancies);
      } else {
        this.sendReponse(
          res,
          400,
          "You cannot see the applicants for following vacancy",
        );
      }
    } catch (err) {
      throw new CustomError("error occured", 400);
    }
  };

  searchVacancies = async (req: Request, res: Response) => {
    const { name } = req.query;
    if (!name) {
      this.sendReponse(res, 400, "Enter name to search");
    }
    const result = await this.vacancyService.searchVacancy(name);
    this.sendReponse(res, 200, `All vacancies with ${name} are:`, result);
  };
}
export default VacancyContoller;
