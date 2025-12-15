import { EmailError } from "../../error/errors";
import Applicants from "../../module/applicants/applicants.model";
import Company from "../../module/company/company.model";
const verifyEmailServiceApplicant = async (token: string) => {
  if (!token) {
    throw new EmailError("Invalid verification link");
  }
  const user = await Applicants.findOne({
    where: { verification_token: token },
  });
  if (!user) {
    throw new EmailError("Invalid");
  }
  user.verified = true;
  user.verification_token = null;
  await user.save();
};
const verifyEmailServiceCompany = async (token: string) => {
  if (!token) {
    throw new EmailError("Invalid verification link");
  }
  const user = await Company.findOne({ where: { verification_token: token } });
  if (!user) {
    throw new EmailError("Invalid");
  }
  user.verified = true;
  user.verification_token = null;
  await user.save();
};
const forgotPasswordAppliacnt = async (token: string) => {
  if (!token) {
    throw new EmailError("Invalid verification link");
  }
  const user = await Applicants.findOne({
    where: { forgot_password_token: token },
  });
  if (!user) {
    throw new EmailError("Invalid");
  }
  if (user.expire_time && user.expire_time < new Date()) {
    throw new EmailError("token");
  }
  user.forgot_password_token = null;
  await user.save();
};

const forgotPasswordCompany = async (token: string) => {
  if (!token) {
    throw new EmailError("Invalid verification link");
  }
  const user = await Company.findOne({
    where: { forgot_password_token: token },
  });
  if (!user) {
    throw new EmailError("Invalid");
  }
  if (user.expire_time && user.expire_time < new Date()) {
    throw new EmailError("token");
  }
  user.forgot_password_token = null;
  await user.save();
};
export {
  verifyEmailServiceApplicant,
  verifyEmailServiceCompany,
  forgotPasswordAppliacnt,
  forgotPasswordCompany,
};
