"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _1 = require(".");
const authentication_1 = require("../../middleware/authentication");
const authorization_middleware_1 = __importDefault(require("../../middleware/authorization/authorization.middleware"));
const auth_type_1 = require("../auth/auth.type");
const vacancyRoute = (0, express_1.Router)();
vacancyRoute.post("/create", authentication_1.authMiddleware.auth, (0, authorization_middleware_1.default)([auth_type_1.ERole.COMPANY]), _1.vacancyController.createVacancy);
vacancyRoute.get("/vacancies", authentication_1.authMiddleware.auth, (0, authorization_middleware_1.default)([auth_type_1.ERole.COMPANY]), _1.vacancyController.getAllVacancyByCompany);
vacancyRoute.get("/all-vacancies", authentication_1.authMiddleware.auth, (0, authorization_middleware_1.default)([auth_type_1.ERole.APPLICANT, auth_type_1.ERole.COMPANY]), _1.vacancyController.getAllVacancy);
vacancyRoute.get("/get-applicant/:id", authentication_1.authMiddleware.auth, (0, authorization_middleware_1.default)([auth_type_1.ERole.COMPANY]), _1.vacancyController.getApplicantsForCompany.bind(_1.vacancyController));
vacancyRoute.get("/search", authentication_1.authMiddleware.auth, (0, authorization_middleware_1.default)([auth_type_1.ERole.APPLICANT, auth_type_1.ERole.COMPANY]), _1.vacancyController.searchVacancies.bind(_1.vacancyController));
exports.default = vacancyRoute;
