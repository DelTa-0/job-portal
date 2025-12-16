"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.jwtHelper = void 0;
const jwt_helper_1 = __importDefault(require("../../helper/jwt-helper/jwt.helper"));
const authentication_middleware_1 = __importDefault(require("./authentication.middleware"));
const jwtHelper = new jwt_helper_1.default();
exports.jwtHelper = jwtHelper;
const authMiddleware = new authentication_middleware_1.default(jwtHelper);
exports.authMiddleware = authMiddleware;
