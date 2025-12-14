import { Response } from "express"

class BaseController {
    sendReponse<T>(res:Response,statusCode:number,message:string,data?:T){
        res.status(statusCode).json({
            statusCode,
            message,
            data,
        })
    }
}

export default BaseController