import { IJWTPayload } from "../helper/jwt-helper/jwt.type";

declare global {
  namespace Express {
    export interface Request {
      payload: IJWTPayload;
    }
  }
}
