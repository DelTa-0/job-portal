"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("../../error"));
const base_controller_1 = __importDefault(require("../base/base.controller"));
class VacancyContoller extends base_controller_1.default {
    constructor(vacancyService) {
        super();
        this.createVacancy = async (req, res) => {
            const vacancy = req.body;
            const payload = req.payload;
            vacancy.companyId = payload.id;
            const newVacancy = await this.vacancyService.createVacancy(vacancy);
            this.sendReponse(res, 200, "Vacancy created successfully", newVacancy);
        };
        this.getAllVacancyByCompany = async (req, res) => {
            const companyId = req.payload.id;
            const vacancies = await this.vacancyService.getAllVacancyByCompany(companyId);
            this.sendReponse(res, 200, "All vacancies from company:", vacancies);
        };
        this.getAllVacancy = async (_req, res) => {
            const vacancies = await this.vacancyService.getAllVacancy();
            this.sendReponse(res, 200, "All vacancies from company:", vacancies);
        };
        this.getApplicantsForCompany = async (req, res) => {
            try {
                const vacancyId = req.params.id;
                const companyId = req.payload.id;
                const verify = await this.vacancyService.checkIfVacancyByCompany(vacancyId, companyId);
                if (verify) {
                    const vacancies = await this.vacancyService.getAllApplicant(vacancyId);
                    this.sendReponse(res, 200, "All applicant for the vacancy:", vacancies);
                }
                else {
                    this.sendReponse(res, 400, "You cannot see the applicants for following vacancy");
                }
            }
            catch (err) {
                throw new error_1.default("error occured", 400);
            }
        };
        this.searchVacancies = async (req, res) => {
            const { name } = req.query;
            if (!name) {
                this.sendReponse(res, 400, "Enter name to search");
            }
            const result = await this.vacancyService.searchVacancy(name);
            this.sendReponse(res, 200, `All vacancies with ${name} are:`, result);
        };
        this.vacancyService = vacancyService;
    }
}
exports.default = VacancyContoller;
