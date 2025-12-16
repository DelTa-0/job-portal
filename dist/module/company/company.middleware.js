"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CompanyMiddleware {
    constructor(companyServices) {
        this.companyAlreadyExist = async (req, res, next) => {
            try {
                const email = req.body.email;
                if (!email) {
                    return res.status(400).json({ message: "Email is required" });
                }
                const alreadyExist = await this.companyServices.getCompanyByEmail(email);
                if (alreadyExist) {
                    return res.status(400).json({
                        message: "Company already exists",
                    });
                }
                next();
            }
            catch (error) {
                next(error);
            }
        };
        this.companyServices = companyServices;
    }
}
exports.default = CompanyMiddleware;
