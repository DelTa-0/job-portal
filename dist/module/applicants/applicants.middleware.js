"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApplicantsMiddleware {
    constructor(applicantService) {
        this.applicantAlreadyExist = async (req, res, next) => {
            try {
                const email = req.body.email;
                if (!email) {
                    return res.status(400).json({ message: "Email is required" });
                }
                const alreadyExist = await this.applicantService.getApplicantByEmail(email);
                if (alreadyExist) {
                    return res.status(400).json({
                        message: "User already exists",
                        data: alreadyExist,
                    });
                }
                next();
            }
            catch (error) {
                next(error);
            }
        };
        this.applicantService = applicantService;
    }
}
exports.default = ApplicantsMiddleware;
