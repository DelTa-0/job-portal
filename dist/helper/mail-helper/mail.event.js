"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = void 0;
const mail_options_1 = __importDefault(require("./mail.options"));
const eventBus_1 = __importDefault(require("../../utils/eventBus"));
const mail_transport_1 = __importDefault(require("./mail.transport"));
const password_mail_1 = __importDefault(require("./password.mail"));
const mail_config_1 = require("../../config/mail.config");
exports.url = `${mail_config_1.MAIL_CONFIG.PROTOCOL}://${mail_config_1.MAIL_CONFIG.HOST}:${mail_config_1.MAIL_CONFIG.PORT}`;
eventBus_1.default.on("applicantCreated", async (userData) => {
    const verificationLink = `${exports.url}/api/v1/auth/applicant/verify-email?token=${userData.token}`;
    const transporter = (0, mail_transport_1.default)();
    const mail = (0, mail_options_1.default)(userData.email, verificationLink);
    await transporter.sendMail(mail);
});
eventBus_1.default.on("companyCreated", async (userData) => {
    const verificationLink = `${exports.url}/api/v1/auth/company/verify-email?token=${userData.token}`;
    const transporter = (0, mail_transport_1.default)();
    const mail = (0, mail_options_1.default)(userData.email, verificationLink);
    await transporter.sendMail(mail);
});
eventBus_1.default.on("forgotPasswordApplicant", async (userData) => {
    const verificationLink = `${exports.url}/api/v1/auth/applicant/forgot-password?token=${userData.token}`;
    const transporter = (0, mail_transport_1.default)();
    const mail = (0, password_mail_1.default)(userData.email, verificationLink);
    await transporter.sendMail(mail);
});
eventBus_1.default.on("forgotPasswordCompany", async (userData) => {
    const verificationLink = `${exports.url}/api/v1/auth/company/forgot-password?token=${userData.token}`;
    const transporter = (0, mail_transport_1.default)();
    const mail = (0, password_mail_1.default)(userData.email, verificationLink);
    await transporter.sendMail(mail);
});
