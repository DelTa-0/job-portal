"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("../../error"));
const errors_1 = require("../../error/errors");
const eventBus_1 = __importDefault(require("../../utils/eventBus"));
const crypto_1 = __importDefault(require("crypto"));
class CompanyService {
    constructor(companyModel, passwordHelper) {
        this.companyModel = companyModel;
        this.passwordHelper = passwordHelper;
    }
    async getCompanyByEmail(email) {
        const company = await this.companyModel.findOne({ where: { email } });
        return company;
    }
    async createCompany(data) {
        const doesCompanyExist = await this.getCompanyByEmail(data.email);
        if (doesCompanyExist) {
            throw new error_1.default("Company already exist", 400);
        }
        const hashedPassword = await this.passwordHelper.bcryptEncryption(data.password);
        data.password = hashedPassword;
        const token = crypto_1.default.randomBytes(32).toString("hex");
        data.verification_token = token;
        const company = this.companyModel.create(data);
        const email = data.email;
        eventBus_1.default.emit("companyCreated", { email, token });
        return company;
    }
    async getAllCompany() {
        const company = await this.companyModel.findAll({
            attributes: { exclude: ["password"] },
        });
        return company;
    }
    async forgotPassword(email) {
        const applicant = await this.getCompanyByEmail(email);
        if (!applicant) {
            throw new errors_1.EmailError("Email doesnot exist!");
        }
        const expire_time = new Date(Date.now() + 10 * 60 * 1000);
        const token = crypto_1.default.randomBytes(32).toString("hex");
        await this.companyModel.update({ forgot_password_token: token, expire_time: expire_time }, { where: { email: email } });
        eventBus_1.default.emit("forgotPasswordCompany", { email, token });
    }
}
exports.default = CompanyService;
