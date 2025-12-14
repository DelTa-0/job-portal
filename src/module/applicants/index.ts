import { passwordHelper } from "../../helper/password-helper";
import Vacancy_Applicant from "../vacancy_applicant/vacancy_applicant.model";
import ApplicantsController from "./applicants.controller";
import ApplicantsMiddleware from "./applicants.middleware";
import Applicants from "./applicants.model";
import ApplicantsService from "./applicants.service";

const applicantsService=new ApplicantsService(Applicants,passwordHelper,Vacancy_Applicant);
const applicantMiddleware=new ApplicantsMiddleware(applicantsService);
const applicantsController=new ApplicantsController(applicantsService)

export {
    applicantsController,
    applicantsService,
    applicantMiddleware
}