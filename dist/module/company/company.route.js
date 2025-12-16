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
const multer_config_1 = __importDefault(require("../../config/multer.config"));
const companyRouter = (0, express_1.Router)();
companyRouter.post("/", multer_config_1.default.single("profile"), _1.companyMiddleware.companyAlreadyExist, _1.companyController.createCompany.bind(_1.companyController));
companyRouter.get("/", authentication_1.authMiddleware.auth, (0, authorization_middleware_1.default)([auth_type_1.ERole.COMPANY]), _1.companyController.getAllCompany.bind(_1.companyController));
companyRouter.get("/get-profile", authentication_1.authMiddleware.auth, (0, authorization_middleware_1.default)([auth_type_1.ERole.COMPANY]), _1.companyController.getProfile.bind(_1.companyController));
companyRouter.post("/forgot-password", _1.companyController.forgetPassword.bind(_1.companyController));
exports.default = companyRouter;
