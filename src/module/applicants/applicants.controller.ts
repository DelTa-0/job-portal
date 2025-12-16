import path from "path";
import CustomError from "../../error";
import { saveFile } from "../../helper/file-helper/file.helper";
import BaseController from "../base/base.controller";
import { IApplicantsService } from "./applicants.types";
import { NextFunction, Request, Response } from "express";
import { ensureUploadsFolder } from "../../utils/ensureUploads";
import { EmailError } from "../../error/errors";

class ApplicantsController extends BaseController {
  private applicantService: IApplicantsService;
  constructor(applicantService: IApplicantsService) {
    super();
    this.applicantService = applicantService;
  }
  async getApplicants(_req: Request, res: Response) {
    const user = await this.applicantService.getAllApplicants();
    this.sendReponse(res, 200, "All applicants:", user);
  }
  async createApplicant(req: Request, res: Response) {
    const data = req.body;
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    if (!files.cv || !files.profile) {
      return res.status(400).json({
        message: "Both CV and Profile image are required",
      });
    }
    const cvFile = files?.cv[0];
    const profileFile = files?.profile[0];
    const cvPath = path.join(ensureUploadsFolder(), cvFile.originalname);
    const profilePath = path.join(
      ensureUploadsFolder(),
      profileFile.originalname,
    );
    data.cvPath = cvPath as string;
    data.profilePath = profilePath as string;
    saveFile(cvFile);
    saveFile(profileFile);
    if (!data) {
      throw new CustomError("Enter all the fields", 400);
    }
    const user = await this.applicantService.createApplicant(data);
    this.sendReponse(
      res,
      200,
      "Applicant created successfully! Verify your email to login",
      user,
    );
  }
  async applyVacancy(req: Request, res: Response, _next: NextFunction) {
    const applicant = req.payload;
    const vacancyId = req.params.vacancyId;
    const applicantId = applicant.id;
    const appliedVacancy = {
      vacancy_id: vacancyId,
      applicant_id: applicantId,
    };
    const alreadyApplied = await this.applicantService.alreadyApplied(
      vacancyId,
      applicantId,
    );
    if (alreadyApplied) {
      this.sendReponse(res, 400, "Already applied to this vacancy.");
    } else if (!alreadyApplied) {
      await this.applicantService.applyVacancy(appliedVacancy);
      this.sendReponse(res, 200, "Applied to vacancy.", appliedVacancy);
    }
  }
  async getAppliedVacancies(req: Request, res: Response) {
    const applicant_id = req.payload.id;
    const vacanciesApplied =
      await this.applicantService.getAppliedVacancies(applicant_id);
    this.sendReponse(res, 200, "All applied vacancies:", vacanciesApplied);
  }
  getProfile = async (req: Request, res: Response) => {
    try {
      const id = req.payload.id;
      const user = await this.applicantService.getApplicantById(id);
      if (!user) return res.status(404).json({ message: "User not found" });
      if (user.profilePath) {
        const fileName = path.basename(user.profilePath);
        const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
        res.json({ ...user.toJSON(), avatarUrl });
      }
    } catch (err: any) {
      throw new EmailError("Cannot get profile of the applicant");
    }
  };
  getCv = async (req: Request, res: Response) => {
    try {
      const id = req.payload.id;
      const user = await this.applicantService.getApplicantById(id);
      if (!user) return res.status(404).json({ message: "User not found" });
      if (user.cvPath) {
        const fileName = path.basename(user.cvPath);
        const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
        res.json({ ...user.toJSON(), avatarUrl });
      }
    } catch (err: any) {
      console.error("Get profile error:", err.stack || err);
      res.status(500).json({ message: err.message || "Server error" });
    }
  };
  forgetPassword = async (req: Request, res: Response) => {
    const email = req.body.email;
    await this.applicantService.forgotPassword(email);
    this.sendReponse(res, 200, "Verification link has been sent!");
  };
}

export default ApplicantsController;
