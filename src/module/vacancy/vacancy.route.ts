import { Router } from "express";
import { vacancyController } from ".";
import { authMiddleware } from "../../middleware/authentication";
import hasRole from "../../middleware/authorization/authorization.middleware";
import { ERole } from "../auth/auth.type";

const vacancyRoute=Router();

vacancyRoute.post('/create',authMiddleware.auth,hasRole([ERole.COMPANY]),vacancyController.createVacancy);
vacancyRoute.get('/vacancies',authMiddleware.auth,hasRole([ERole.COMPANY]),vacancyController.getAllVacancyByCompany)
vacancyRoute.get('/all_vacancies',authMiddleware.auth,hasRole([ERole.APPLICANT,ERole.COMPANY]),vacancyController.getAllVacancy)
vacancyRoute.get('/get_applicant/:id',authMiddleware.auth,hasRole([ERole.COMPANY]),vacancyController.getApplicantsForCompany.bind(vacancyController));
vacancyRoute.get('/search',authMiddleware.auth,hasRole([ERole.APPLICANT,ERole.COMPANY]),vacancyController.searchVacancies.bind(vacancyController))
// vacancyRoute.get('/get_profiles',
//     authMiddleware.auth,hasRole([ERole.COMPANY]),
//     vacancyController.getProfile);

export default vacancyRoute