"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelper = void 0;
const jwt_helper_1 = __importDefault(require("./jwt.helper"));
const jwtHelper = new jwt_helper_1.default();
exports.jwtHelper = jwtHelper;
