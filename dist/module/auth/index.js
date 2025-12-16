"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.authService = void 0;
const jwt_helper_1 = require("../../helper/jwt-helper");
const password_helper_1 = require("../../helper/password-helper");
const applicants_model_1 = __importDefault(require("../applicants/applicants.model"));
const company_model_1 = __importDefault(require("../company/company.model"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const auth_service_1 = __importDefault(require("./auth.service"));
const authService = new auth_service_1.default(jwt_helper_1.jwtHelper, password_helper_1.passwordHelper, applicants_model_1.default, company_model_1.default);
exports.authService = authService;
const authController = new auth_controller_1.default(authService);
exports.authController = authController;
