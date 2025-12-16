"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vacancyService = exports.vacancyController = void 0;
const vacancy_controller_1 = __importDefault(require("./vacancy.controller"));
const vacancy_model_1 = __importDefault(require("./vacancy.model"));
const vacancy_service_1 = __importDefault(require("./vacancy.service"));
const vacancyService = new vacancy_service_1.default(vacancy_model_1.default);
exports.vacancyService = vacancyService;
const vacancyController = new vacancy_controller_1.default(vacancyService);
exports.vacancyController = vacancyController;
