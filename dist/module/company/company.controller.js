"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = __importDefault(require("../base/base.controller"));
const file_helper_1 = require("../../helper/file-helper/file.helper");
const ensureUploads_1 = require("../../utils/ensureUploads");
const path_1 = __importDefault(require("path"));
const error_1 = __importDefault(require("../../error"));
class CompanyController extends base_controller_1.default {
    constructor(companyService) {
        super();
        this.getProfile = async (req, res) => {
            const email = req.payload.email;
            const user = await this.companyService.getCompanyByEmail(email);
            if (!user)
                return res.status(404).json({ message: "User not found!" });
            if (user.profilePath) {
                const fileName = path_1.default.basename(user.profilePath);
                const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
                this.sendReponse(res, 200, "Company details:", {
                    ...user.toJSON(),
                    avatarUrl,
                });
            }
            else {
                throw new error_1.default("Company doesnot have profile!", 400);
            }
        };
        this.forgetPassword = async (req, res) => {
            const email = req.body.email;
            await this.companyService.forgotPassword(email);
            this.sendReponse(res, 200, "Verification link has been sent!");
        };
        this.companyService = companyService;
    }
    async createCompany(req, res, next) {
        try {
            const data = req.body;
            const file = req.file;
            const profilePath = (file === null || file === void 0 ? void 0 : file.originalname)
                ? path_1.default.join((0, ensureUploads_1.ensureUploadsFolder)(), file.originalname)
                : null;
            data.profilePath = profilePath;
            if (file) {
                (0, file_helper_1.saveFile)(file);
            }
            if (!data) {
                this.sendReponse(res, 400, "Enter all fields");
            }
            const company = await this.companyService.createCompany(data);
            this.sendReponse(res, 200, "Company created successfully! Verify your email to login", company);
        }
        catch (err) {
            next(err);
        }
    }
    async getAllCompany(_req, res) {
        const company = await this.companyService.getAllCompany();
        this.sendReponse(res, 200, "All companies:", company);
    }
}
exports.default = CompanyController;
