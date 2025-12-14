import JWTHelper from "../../helper/jwt-helper/jwt.helper";
import AuthenticationMiddleware from "./authentication.middleware";

const jwtHelper=new JWTHelper();

const authMiddleware=new AuthenticationMiddleware(jwtHelper )

export {
    jwtHelper,authMiddleware
}