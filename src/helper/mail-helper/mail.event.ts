import mailHelper from "./mail.options";
import eventBus from "../../utils/eventBus";
import createTransporter from "./mail.transport";
import passwordHelper from "./password.mail";

eventBus.on(
  "applicantCreated",
  async (userData: { email: string; token: string }) => {
    const verificationLink = `http://localhost:3000/api/v1/auth/applicant/verify-email?token=${userData.token}`;
    const transporter = createTransporter();
    const mail = mailHelper(userData.email, verificationLink);
    await transporter.sendMail(mail);
  },
);

eventBus.on(
  "companyCreated",
  async (userData: { email: string; token: string }) => {
    const verificationLink = `http://localhost:3000/api/v1/auth/company/verify-email?token=${userData.token}`;
    const transporter = createTransporter();
    const mail = mailHelper(userData.email, verificationLink);
    await transporter.sendMail(mail);
  },
);

eventBus.on(
  "forgotPasswordApplicant",
  async (userData: { email: string; token: string }) => {
    const verificationLink = `http://localhost:3000/api/v1/auth/applicant/forgot-password?token=${userData.token}`;
    const transporter = createTransporter();
    const mail = passwordHelper(userData.email, verificationLink);
    await transporter.sendMail(mail);
  },
);
eventBus.on(
  "forgotPasswordCompany",
  async (userData: { email: string; token: string }) => {
    const verificationLink = `http://localhost:3000/api/v1/auth/company/forgot-password?token=${userData.token}`;
    const transporter = createTransporter();
    const mail = passwordHelper(userData.email, verificationLink);
    await transporter.sendMail(mail);
  },
);