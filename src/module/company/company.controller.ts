import BaseController from "../base/base.controller";
import { ICompanyService } from "./company.types"
import { Request,Response,NextFunction } from "express";
import { saveFile } from "../../helper/fileHelper/file.helper";
import { ensureUploadsFolder } from "../../utils/ensureUploads";
import path from "path";
class CompanyController extends BaseController{
    private companyService:ICompanyService;
    constructor(companyService:ICompanyService){
        super();
        this.companyService=companyService
    }
    async createCompany(req:Request,res:Response,next:NextFunction){
        try{
        const data=req.body;
        const file=req.file;
        const profilePath=path.join(ensureUploadsFolder(),file?.originalname as string)
        data.profilePath=profilePath as string;
        if(file){
        saveFile(file)
        }
        if(!data){
            this.sendReponse(res,400,"enter all fields");
        }
        const company=await this.companyService.createCompany(data);
        this.sendReponse(res,200,"company created successfully",company)
    }catch(err){
        next(err);
        }
    }
    async getAllCompany(req:Request,res:Response){
        const company=await this.companyService.getAllCompany();
        this.sendReponse(res,200,"all companies:",company)   
    }
    getProfile = async (req: Request, res: Response) => {
        try {
          const email = req.payload.email;
          const user = await this.companyService.getCompanyByEmail(email);
          if (!user) return res.status(404).json({ message: "User not found" });
          if (user.profilePath) {
          const fileName = path.basename(user.profilePath);
           const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
           res.json({ ...user.toJSON(), avatarUrl });
        }
        } catch (err: any) {
          console.error("Get profile error:", err.stack || err);
          res.status(500).json({ message: err.message || "Server error" });
        }
      };
    
}


export default CompanyController