import { ERole } from "../auth/auth.type";
import Vacancy_Applicant from "../vacancy_applicant/vacancy_applicant.model";
import { IVacancy_Applicant } from "../vacancy_applicant/vacancy_applicant.type";
import Applicants from "./applicants.model";

export type IApplicants = {
  id: number;
  name: string;
  address: string;
  skills: string;
  cv: string;
  email: string;
  password: string;
  profilePic: string;
  role: ERole;
  verified: boolean;
  verification_token: string | null;
  forgot_password_token: string | null;
  expire_time?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type IApplicantsCreationAttributes = Omit<
  IApplicants,
  "id" | "createdAt" | "updatedAt"
>;

export interface IApplicantsService {
  getAllApplicants(): Promise<Applicants[] | null>;
  getApplicantByEmail(email: string): Promise<Applicants | null>;
  createApplicant(data: IApplicants): Promise<Applicants | null>;
  applyVacancy(data: IVacancy_Applicant): Promise<Vacancy_Applicant>;
  alreadyApplied(
    vacancy_id: string,
    applicantId: number,
  ): Promise<IVacancy_Applicant | null>;
  getAppliedVacancies(applicant_id: number): Promise<IVacancy_Applicant[]>;
  getApplicantById(id: number): Promise<Applicants | null>;
  forgotPassword(email: string): any;
}
