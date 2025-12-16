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
const vacancy_model_1 = __importDefault(require("../vacancy/vacancy.model"));
const vacancy_applicant_model_1 = __importDefault(require("../vacancy_applicant/vacancy_applicant.model"));
const auth_type_1 = require("../auth/auth.type");
let Applicants = class Applicants extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_2.PrimaryKey,
    sequelize_typescript_2.AutoIncrement,
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.INTEGER),
    __metadata("design:type", Number)
], Applicants.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_2.AllowNull)(false),
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.STRING),
    __metadata("design:type", String)
], Applicants.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_2.AllowNull)(false),
    (0, sequelize_typescript_2.Column)({
        type: sequelize_typescript_2.DataType.STRING,
        unique: true,
    }),
    __metadata("design:type", String)
], Applicants.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_2.AllowNull)(false),
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.STRING),
    __metadata("design:type", String)
], Applicants.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_2.AllowNull)(true),
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.ENUM(...Object.values(auth_type_1.ERole))),
    __metadata("design:type", String)
], Applicants.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.STRING),
    __metadata("design:type", String)
], Applicants.prototype, "skills", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Applicants.prototype, "verified", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.STRING),
    __metadata("design:type", Object)
], Applicants.prototype, "verification_token", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.STRING),
    __metadata("design:type", String)
], Applicants.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.STRING),
    __metadata("design:type", Object)
], Applicants.prototype, "forgot_password_token", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.DATE),
    __metadata("design:type", Object)
], Applicants.prototype, "expire_time", void 0);
__decorate([
    (0, sequelize_typescript_2.AllowNull)(true),
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.STRING),
    __metadata("design:type", String)
], Applicants.prototype, "profilePath", void 0);
__decorate([
    (0, sequelize_typescript_2.AllowNull)(true),
    (0, sequelize_typescript_2.Column)(sequelize_typescript_2.DataType.STRING),
    __metadata("design:type", String)
], Applicants.prototype, "cvPath", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => vacancy_model_1.default, () => vacancy_applicant_model_1.default),
    __metadata("design:type", Array)
], Applicants.prototype, "vacancies", void 0);
Applicants = __decorate([
    (0, sequelize_typescript_2.Table)({
        tableName: "applicants",
        timestamps: true,
        defaultScope: {
            attributes: {
                exclude: ["password"],
            },
        },
        scopes: {
            withPassword: {
                attributes: { include: [] },
            },
        },
    })
], Applicants);
exports.default = Applicants;
