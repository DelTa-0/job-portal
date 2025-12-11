import JWTHelper from "../../helper/jwtHelper/jwt.helper";
import AuthenticationMiddleware from "./authentication.middleware";

const jwtHelper=new JWTHelper();

const authMiddleware=new AuthenticationMiddleware(jwtHelper )

export {
    jwtHelper,authMiddleware
}