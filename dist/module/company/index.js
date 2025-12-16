"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyMiddleware = exports.companyController = exports.companyService = void 0;
const password_helper_1 = require("../../helper/password-helper");
const company_controller_1 = __importDefault(require("./company.controller"));
const company_middleware_1 = __importDefault(require("./company.middleware"));
const company_model_1 = __importDefault(require("./company.model"));
const company_service_1 = __importDefault(require("./company.service"));
const companyService = new company_service_1.default(company_model_1.default, password_helper_1.passwordHelper);
exports.companyService = companyService;
const companyMiddleware = new company_middleware_1.default(companyService);
exports.companyMiddleware = companyMiddleware;
const companyController = new company_controller_1.default(companyService);
exports.companyController = companyController;
