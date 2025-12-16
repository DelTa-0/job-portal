"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class PasswordHelper {
    async bcryptEncryption(password) {
        const hashedPassword = bcrypt_1.default.hash(password, 10);
        return hashedPassword;
    }
    async bcryptCompare(password, hashedPassword) {
        const verifyPassword = await bcrypt_1.default.compare(password, hashedPassword);
        return verifyPassword;
    }
}
exports.default = PasswordHelper;
