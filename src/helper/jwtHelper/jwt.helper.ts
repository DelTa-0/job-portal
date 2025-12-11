import { JWT_CONFIG } from "../../config/jwt.config";
import CustomError from "../../error";
import { IJWTHelper, IJWTPayload } from "./jwt.type";
import jwt from "jsonwebtoken";

class JWTHelper implements IJWTHelper {
  verifyToken(token: string): IJWTPayload {
    try {
      return jwt.verify(token, JWT_CONFIG.SECRET!) as IJWTPayload;
    } catch (err) {
      throw new CustomError("Invalid token",400);
    }
  }
  decodeToken(token: string): IJWTPayload {
    const decodedData = jwt.decode(token, { json: true });
    if (!decodedData) {
      throw new CustomError("Unable to decode token",400);
    }
    return decodedData as IJWTPayload;
  }
  createToken(payload: IJWTPayload): string {
    return jwt.sign(payload,JWT_CONFIG.SECRET!, {
      expiresIn: "1d",
    });
  }
}

export default JWTHelper