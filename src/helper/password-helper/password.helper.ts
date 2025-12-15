import bcrypt from "bcrypt";
import { IPasswordHelper } from "./password.type";
class PasswordHelper implements IPasswordHelper {
  async bcryptEncryption(password: string): Promise<string> {
    const hashedPassword = bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async bcryptCompare(
    password: string,
    hashedPassword: string,
  ): Promise<Boolean> {
    const verifyPassword = await bcrypt.compare(password, hashedPassword);
    return verifyPassword;
  }
}

export default PasswordHelper;
