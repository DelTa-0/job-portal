import { ERole } from "../../module/auth/auth.type";

export interface IJWTPayload {
  id: number;
  email: string;
  role: ERole;
}

export interface IJWTHelper {
  verifyToken(token: string): IJWTPayload;
  createToken(payload: IJWTPayload): string;
  decodeToken(token: string): IJWTPayload;
}