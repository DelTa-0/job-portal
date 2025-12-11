import applicantsRouter from '../module/applicants/applicants.router'
import {Router,Request,Response} from 'express'
import companyRouter from '../module/company/company.route'
import vacancyRoute from '../module/vacancy/vacancy.route'
import authRouter from '../module/auth/auth.router'
const router=Router()

router.get('/',(req:Request,res:Response)=>{
    res.send("hello from router")
})
router.use('/applicants',applicantsRouter);
router.use('/company',companyRouter);
router.use('/vacancy',vacancyRoute);
router.use('/auth',authRouter);


export default router