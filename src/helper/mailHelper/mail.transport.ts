import { MAIL_CONFIG } from "../../config/mail.config";
import nodemailer from 'nodemailer'
const createTransporter = () => {
  const transport = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: MAIL_CONFIG.USER,
      pass: MAIL_CONFIG.PASS,
    },
  });
  return transport;
};
export default createTransporter;