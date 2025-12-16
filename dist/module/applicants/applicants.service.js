"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("../../error"));
const errors_1 = require("../../error/errors");
const eventBus_1 = __importDefault(require("../../utils/eventBus"));
const crypto_1 = __importDefault(require("crypto"));
class ApplicantsService {
    constructor(applicantModel, passwordHelper, vacancyApplicantModel) {
        this.applicantModel = applicantModel;
        this.passwordHelper = passwordHelper;
        this.vacancyApplicantModel = vacancyApplicantModel;
    }
    async getAllApplicants() {
        const applicants = this.applicantModel.findAll();
        return applicants;
    }
    async getApplicantByEmail(email) {
        const applicant = await this.applicantModel
            .scope("withPassword")
            .findOne({ where: { email: email } });
        return applicant;
    }
    async getApplicantById(id) {
        const applicant = await this.applicantModel.findOne({ where: { id: id } });
        return applicant;
    }
    async createApplicant(data) {
        const applicantExist = await this.getApplicantByEmail(data.email);
        if (applicantExist) {
            throw new error_1.default("Account already exist.", 400);
        }
        const hashedPassword = await this.passwordHelper.bcryptEncryption(data.password);
        data.password = hashedPassword;
        const token = crypto_1.default.randomBytes(32).toString("hex");
        data.verification_token = token;
        const applicant = await this.applicantModel.create(data);
        const email = data.email;
        eventBus_1.default.emit("applicantCreated", { email, token });
        return applicant;
    }
    async alreadyApplied(vacancy_id, applicantId) {
        const applied = await this.vacancyApplicantModel.findOne({
            where: { vacancy_id, applicant_id: applicantId },
        });
        return applied;
    }
    async applyVacancy(data) {
        const vacancy = await this.vacancyApplicantModel.create(data);
        return vacancy;
    }
    async getAppliedVacancies(applicant_id) {
        return await this.vacancyApplicantModel.findAll({
            where: { applicant_id },
        });
    }
    async forgotPassword(email) {
        const applicant = await this.getApplicantByEmail(email);
        if (!applicant) {
            throw new errors_1.EmailError("Email doesnot exist!");
        }
        const expire_time = new Date(Date.now() + 10 * 60 * 1000);
        const token = crypto_1.default.randomBytes(6).toString("hex");
        await this.applicantModel.update({ forgot_password_token: token, expire_time: expire_time }, { where: { email: email } });
        eventBus_1.default.emit("forgotPasswordApplicant", { email, token });
    }
}
exports.default = ApplicantsService;
