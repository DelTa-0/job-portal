"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_config_1 = require("../../config/mail.config");
const nodemailer_1 = __importDefault(require("nodemailer"));
const createTransporter = () => {
    const transport = nodemailer_1.default.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: mail_config_1.MAIL_CONFIG.USER,
            pass: mail_config_1.MAIL_CONFIG.PASS,
        },
    });
    return transport;
};
exports.default = createTransporter;
