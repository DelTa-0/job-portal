import {Router} from 'express'
import { applicantMiddleware, applicantsController } from '.'
import { authMiddleware } from '../../middleware/authentication';
import hasRole from '../../middleware/authorization/authorization.middleware';
import { ERole } from '../auth/auth.type';
import upload from '../../config/multer.config';

const applicantsRouter=Router()

applicantsRouter.get('/',
    applicantsController.getApplicants.bind(applicantsController)
)

applicantsRouter.post('/create_applicant',
    upload.fields([
    { name: "cv" }, 
    { name: "profile" }
  ]),
applicantMiddleware.applicantAlreadyExist,
applicantsController.createApplicant.bind(applicantsController));
applicantsRouter.post('/apply/:vacancyId',authMiddleware.auth,hasRole([ERole.APPLICANT]),applicantsController.applyVacancy.bind(applicantsController));
applicantsRouter.get('/vacancies',authMiddleware.auth,hasRole([ERole.APPLICANT]),applicantsController.getAppliedVacancies.bind(applicantsController));
applicantsRouter.get('/get-profile',authMiddleware.auth,hasRole([ERole.APPLICANT]),applicantsController.getProfile);
applicantsRouter.post('/forgot-password',applicantsController.forgetPassword);
applicantsRouter.get('/get-cv',authMiddleware.auth,hasRole([ERole.APPLICANT]),applicantsController.getCv);

export default applicantsRouter