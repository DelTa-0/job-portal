"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordCompany = exports.forgotPasswordAppliacnt = exports.verifyEmailServiceCompany = exports.verifyEmailServiceApplicant = void 0;
const errors_1 = require("../../error/errors");
const applicants_model_1 = __importDefault(require("../../module/applicants/applicants.model"));
const company_model_1 = __importDefault(require("../../module/company/company.model"));
const verifyEmailServiceApplicant = async (token) => {
    if (!token) {
        throw new errors_1.EmailError("Invalid verification link");
    }
    const user = await applicants_model_1.default.findOne({
        where: { verification_token: token },
    });
    if (!user) {
        throw new errors_1.EmailError("Invalid");
    }
    user.verified = true;
    user.verification_token = null;
    await user.save();
};
exports.verifyEmailServiceApplicant = verifyEmailServiceApplicant;
const verifyEmailServiceCompany = async (token) => {
    if (!token) {
        throw new errors_1.EmailError("Invalid verification link");
    }
    const user = await company_model_1.default.findOne({ where: { verification_token: token } });
    if (!user) {
        throw new errors_1.EmailError("Invalid");
    }
    user.verified = true;
    user.verification_token = null;
    await user.save();
};
exports.verifyEmailServiceCompany = verifyEmailServiceCompany;
const forgotPasswordAppliacnt = async (token) => {
    if (!token) {
        throw new errors_1.EmailError("Invalid verification link");
    }
    const user = await applicants_model_1.default.findOne({
        where: { forgot_password_token: token },
    });
    if (!user) {
        throw new errors_1.EmailError("Invalid");
    }
    if (user.expire_time && user.expire_time < new Date()) {
        throw new errors_1.EmailError("token");
    }
    user.forgot_password_token = null;
    await user.save();
};
exports.forgotPasswordAppliacnt = forgotPasswordAppliacnt;
const forgotPasswordCompany = async (token) => {
    if (!token) {
        throw new errors_1.EmailError("Invalid verification link");
    }
    const user = await company_model_1.default.findOne({
        where: { forgot_password_token: token },
    });
    if (!user) {
        throw new errors_1.EmailError("Invalid");
    }
    if (user.expire_time && user.expire_time < new Date()) {
        throw new errors_1.EmailError("token");
    }
    user.forgot_password_token = null;
    await user.save();
};
exports.forgotPasswordCompany = forgotPasswordCompany;
