import { IJWTPayload } from "../helper/jwtHelper/jwt.type";

declare global {
  namespace Express {
    export interface Request {
      payload: IJWTPayload;
    }
  }
}