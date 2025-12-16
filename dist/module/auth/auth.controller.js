"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = __importDefault(require("../base/base.controller"));
const mail_helper_1 = require("../../helper/mail-helper/mail.helper");
const errors_1 = require("../../error/errors");
class AuthController extends base_controller_1.default {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    async loginAsApplicant(req, res, next) {
        try {
            const data = await this.authService.loginAsApplicant(res, req.body.email, req.body.password);
            this.sendReponse(res, 200, "Logged in successfully!", data);
        }
        catch (err) {
            next(err);
        }
    }
    async loginAsCompany(req, res, next) {
        try {
            const data = await this.authService.loginAsCompany(res, req.body.email, req.body.password);
            this.sendReponse(res, 200, "Logged in successfully!", data);
        }
        catch (err) {
            next(err);
        }
    }
    async verifyEmailCompany(req, res) {
        try {
            const token = req.query.token;
            await (0, mail_helper_1.verifyEmailServiceCompany)(token);
            this.sendReponse(res, 200, "Email verified! Log in");
        }
        catch (err) {
            throw new errors_1.EmailError("Some error while verifying");
        }
    }
    async verifyEmailApplicant(req, res) {
        try {
            const token = req.query.token;
            await (0, mail_helper_1.verifyEmailServiceApplicant)(token);
            this.sendReponse(res, 200, "Email verified! Log in");
        }
        catch (err) {
            throw new errors_1.EmailError("Some error while verifying");
        }
    }
    async verifyPasswordApplicant(req, res) {
        try {
            const token = req.query.token;
            await (0, mail_helper_1.forgotPasswordAppliacnt)(token);
            this.sendReponse(res, 200, "Verified! Enter new password");
        }
        catch (err) {
            throw new errors_1.EmailError("Token expired!");
        }
    }
    async verifyPasswordCompany(req, res) {
        try {
            const token = req.query.token;
            await (0, mail_helper_1.forgotPasswordCompany)(token);
            this.sendReponse(res, 200, "Verified! Enter new password");
            //redirect to company/update route
        }
        catch (err) {
            throw new errors_1.EmailError("Token expired!");
        }
    }
}
exports.default = AuthController;
