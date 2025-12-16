"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicantMiddleware = exports.applicantsService = exports.applicantsController = void 0;
const password_helper_1 = require("../../helper/password-helper");
const vacancy_applicant_model_1 = __importDefault(require("../vacancy_applicant/vacancy_applicant.model"));
const applicants_controller_1 = __importDefault(require("./applicants.controller"));
const applicants_middleware_1 = __importDefault(require("./applicants.middleware"));
const applicants_model_1 = __importDefault(require("./applicants.model"));
const applicants_service_1 = __importDefault(require("./applicants.service"));
const applicantsService = new applicants_service_1.default(applicants_model_1.default, password_helper_1.passwordHelper, vacancy_applicant_model_1.default);
exports.applicantsService = applicantsService;
const applicantMiddleware = new applicants_middleware_1.default(applicantsService);
exports.applicantMiddleware = applicantMiddleware;
const applicantsController = new applicants_controller_1.default(applicantsService);
exports.applicantsController = applicantsController;
