import { Request, Response, NextFunction } from "express";
import { IJWTHelper } from "../../helper/jwt-helper/jwt.type";
import { NotFoundError, UnauthorizedError } from "../../error/errors";

class AuthenticationMiddleware {
  private jwtHelper: IJWTHelper;
  constructor(jwtHelper: IJWTHelper) {
    this.jwtHelper = jwtHelper;
  }
  auth = async (req: Request, _res: Response, next: NextFunction) => {
    const accessToken: string =
      req.cookies?.accessToken ?? req.header("Authorization");
    if (!accessToken) {
      throw new UnauthorizedError("login to continue");
    }
    const splitToken = accessToken.split(" ");
    if (splitToken[0] !== "Bearer") {
      throw new NotFoundError("access token must be of Bearer type");
    }
    const token = splitToken[1];
    if (!token) {
      throw new UnauthorizedError("Token error!");
    }
    const verifyToken = await this.jwtHelper.verifyToken(token);
    if (!verifyToken) {
      throw new UnauthorizedError("token not verified!");
    }
    const decodedData = await this.jwtHelper.decodeToken(token);
    req.payload = decodedData;
    next();
  };
}

export default AuthenticationMiddleware;
