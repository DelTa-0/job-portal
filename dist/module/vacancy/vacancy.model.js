"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_typescript_2 = require("sequelize-typescript");
const company_model_1 = __importDefault(require("../company/company.model"));
const applicants_model_1 = __importDefault(require("../applicants/applicants.model"));
const vacancy_applicant_model_1 = __importDefault(require("../vacancy_applicant/vacancy_applicant.model"));
let Vacancy = class Vacancy extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Vacancy.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Vacancy.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Vacancy.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => company_model_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Vacancy.prototype, "companyId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => company_model_1.default),
    __metadata("design:type", company_model_1.default)
], Vacancy.prototype, "company", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => applicants_model_1.default, () => vacancy_applicant_model_1.default),
    __metadata("design:type", Array)
], Vacancy.prototype, "applicants", void 0);
Vacancy = __decorate([
    (0, sequelize_typescript_2.Table)({
        tableName: "vacancy",
        timestamps: true,
        defaultScope: {
            attributes: {
                exclude: [""],
            },
        },
    })
], Vacancy);
exports.default = Vacancy;
