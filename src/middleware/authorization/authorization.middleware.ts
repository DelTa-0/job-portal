import { Request,Response,NextFunction } from "express"
import { ERole } from "../../module/auth/auth.type"
import CustomError from "../../error";

const hasRole=(roles:ERole[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        const user=req.payload;
        if(!user){
            throw new CustomError("login to continue!",400)
        }
        if(!roles.includes(user.role)){
            return res.status(403).json({ message: "Access denied: Insufficient permissions" });
        }
        next();
    }
}

export default hasRole