"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("../../error"));
const hasRole = (roles) => {
    return (req, res, next) => {
        const user = req.payload;
        if (!user) {
            throw new error_1.default("login to continue!", 400);
        }
        if (!roles.includes(user.role)) {
            return res
                .status(403)
                .json({ message: "Access denied: Insufficient permissions" });
        }
        next();
    };
};
exports.default = hasRole;
