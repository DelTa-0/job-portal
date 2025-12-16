"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_config_1 = require("../../config/jwt.config");
const error_1 = __importDefault(require("../../error"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTHelper {
    verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, jwt_config_1.JWT_CONFIG.SECRET);
        }
        catch (err) {
            throw new error_1.default("Invalid token", 400);
        }
    }
    decodeToken(token) {
        const decodedData = jsonwebtoken_1.default.decode(token, { json: true });
        if (!decodedData) {
            throw new error_1.default("Unable to decode token", 400);
        }
        return decodedData;
    }
    createToken(payload) {
        return jsonwebtoken_1.default.sign(payload, jwt_config_1.JWT_CONFIG.SECRET, {
            expiresIn: "1d",
        });
    }
}
exports.default = JWTHelper;
