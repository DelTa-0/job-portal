class CustomError extends Error{
    public statusCode:number;
    constructor(message:string,statusCode:number) {
        super(message)
        this.statusCode=statusCode;
        if(typeof Error.captureStackTrace=='function'){
            Error.captureStackTrace(this,this.constructor)
        }
        else{
            this.stack=new Error(message).stack
        }
    }
}
export default CustomError