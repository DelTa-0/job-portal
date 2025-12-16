"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const error_1 = __importDefault(require("../../error"));
const file_helper_1 = require("../../helper/file-helper/file.helper");
const base_controller_1 = __importDefault(require("../base/base.controller"));
const ensureUploads_1 = require("../../utils/ensureUploads");
const errors_1 = require("../../error/errors");
class ApplicantsController extends base_controller_1.default {
    constructor(applicantService) {
        super();
        this.getProfile = async (req, res) => {
            try {
                const id = req.payload.id;
                const user = await this.applicantService.getApplicantById(id);
                if (!user)
                    return res.status(404).json({ message: "User not found" });
                if (user.profilePath) {
                    const fileName = path_1.default.basename(user.profilePath);
                    const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
                    res.json({ ...user.toJSON(), avatarUrl });
                }
            }
            catch (err) {
                throw new errors_1.EmailError("Cannot get profile of the applicant");
            }
        };
        this.getCv = async (req, res) => {
            try {
                const id = req.payload.id;
                const user = await this.applicantService.getApplicantById(id);
                if (!user)
                    return res.status(404).json({ message: "User not found" });
                if (user.cvPath) {
                    const fileName = path_1.default.basename(user.cvPath);
                    const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
                    res.json({ ...user.toJSON(), avatarUrl });
                }
            }
            catch (err) {
                console.error("Get profile error:", err.stack || err);
                res.status(500).json({ message: err.message || "Server error" });
            }
        };
        this.forgetPassword = async (req, res) => {
            const email = req.body.email;
            await this.applicantService.forgotPassword(email);
            this.sendReponse(res, 200, "Verification link has been sent!");
        };
        this.applicantService = applicantService;
    }
    async getApplicants(_req, res) {
        const user = await this.applicantService.getAllApplicants();
        this.sendReponse(res, 200, "All applicants:", user);
    }
    async createApplicant(req, res) {
        const data = req.body;
        const files = req.files;
        if (!files.cv || !files.profile) {
            return res.status(400).json({
                message: "Both CV and Profile image are required",
            });
        }
        const cvFile = files === null || files === void 0 ? void 0 : files.cv[0];
        const profileFile = files === null || files === void 0 ? void 0 : files.profile[0];
        const cvPath = path_1.default.join((0, ensureUploads_1.ensureUploadsFolder)(), cvFile.originalname);
        const profilePath = path_1.default.join((0, ensureUploads_1.ensureUploadsFolder)(), profileFile.originalname);
        data.cvPath = cvPath;
        data.profilePath = profilePath;
        (0, file_helper_1.saveFile)(cvFile);
        (0, file_helper_1.saveFile)(profileFile);
        if (!data) {
            throw new error_1.default("Enter all the fields", 400);
        }
        const user = await this.applicantService.createApplicant(data);
        this.sendReponse(res, 200, "Applicant created successfully! Verify your email to login", user);
    }
    async applyVacancy(req, res, _next) {
        const applicant = req.payload;
        const vacancyId = req.params.vacancyId;
        const applicantId = applicant.id;
        const appliedVacancy = {
            vacancy_id: vacancyId,
            applicant_id: applicantId,
        };
        const alreadyApplied = await this.applicantService.alreadyApplied(vacancyId, applicantId);
        if (alreadyApplied) {
            this.sendReponse(res, 400, "Already applied to this vacancy.");
        }
        else if (!alreadyApplied) {
            await this.applicantService.applyVacancy(appliedVacancy);
            this.sendReponse(res, 200, "Applied to vacancy.", appliedVacancy);
        }
    }
    async getAppliedVacancies(req, res) {
        const applicant_id = req.payload.id;
        const vacanciesApplied = await this.applicantService.getAppliedVacancies(applicant_id);
        this.sendReponse(res, 200, "All applied vacancies:", vacanciesApplied);
    }
}
exports.default = ApplicantsController;
