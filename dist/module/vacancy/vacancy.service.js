"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const applicants_model_1 = __importDefault(require("../applicants/applicants.model"));
const company_model_1 = __importDefault(require("../company/company.model"));
const sequelize_1 = require("sequelize");
class VacancyService {
    constructor(vacancyModel) {
        this.vacancyModel = vacancyModel;
    }
    async createVacancy(data) {
        return this.vacancyModel.create(data);
    }
    async getAllVacancy() {
        return await this.vacancyModel.findAll();
    }
    async getAllVacancyByCompany(company_id) {
        return await this.vacancyModel.findAll({
            where: { companyId: company_id },
        });
    }
    async checkIfVacancyByCompany(vacancyId, companyId) {
        const isVacancyByCompany = await this.vacancyModel.findOne({
            where: { id: vacancyId },
            include: [
                {
                    model: company_model_1.default,
                    where: { id: companyId },
                },
            ],
        });
        return isVacancyByCompany;
    }
    async getAllApplicant(vacancyId) {
        const vacancies = await this.vacancyModel.findAll({
            where: { id: vacancyId },
            include: [
                {
                    model: applicants_model_1.default,
                    through: { attributes: [] },
                    attributes: ["id", "name", "email", "cvPath"],
                },
            ],
        });
        return vacancies;
    }
    async searchVacancy(name) {
        const vacancies = await this.vacancyModel.findAll({
            where: {
                name: { [sequelize_1.Op.iLike]: `%${name}%` },
            },
        });
        return vacancies;
    }
}
exports.default = VacancyService;
