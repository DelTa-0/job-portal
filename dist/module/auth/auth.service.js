"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("../../error"));
class AuthService {
    constructor(jwtHelper, passwordHelper, applicantModel, companyModel) {
        this.jwtHelper = jwtHelper;
        this.passwordHelper = passwordHelper;
        this.applicantModel = applicantModel;
        this.companyModel = companyModel;
    }
    async loginAsApplicant(res, email, password) {
        const applicant = await this.applicantModel
            .scope("withPassword")
            .findOne({ where: { email } });
        const user = applicant;
        if (!user) {
            throw new error_1.default("Email doesnot exist!", 400);
        }
        if (!user.verified) {
            throw new error_1.default("Confirm your email address", 400);
        }
        const verifiedUser = await this.passwordHelper.bcryptCompare(password, user.password);
        if (!verifiedUser) {
            throw new error_1.default("Password invalid!", 400);
        }
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        const accessToken = await this.jwtHelper.createToken(payload);
        res.cookie("accessToken", accessToken);
    }
    async loginAsCompany(res, email, password) {
        const company = await this.companyModel
            .scope("withPassword")
            .findOne({ where: { email } });
        const user = company;
        if (!user) {
            throw new error_1.default("Email doesnot exist!", 400);
        }
        if (!user.verified) {
            throw new error_1.default("Confirm your email address", 400);
        }
        const hashedPassword = user.getDataValue("password");
        const verifiedUser = await this.passwordHelper.bcryptCompare(password, hashedPassword);
        if (!verifiedUser) {
            throw new error_1.default("Password invalid!", 400);
        }
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        const accessToken = await this.jwtHelper.createToken(payload);
        res.cookie("accessToken", accessToken);
    }
}
exports.default = AuthService;
