"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mailHelper = (recipient, verificationLink) => {
    const mailOptions = {
        from: "no-reply@example.com",
        to: recipient,
        subject: "Verify your account",
        html: `
      <p>Click the button below to verify your email!</p>
      <a href="${verificationLink}">
        <button style="padding:10px 20px;background:#4CAF50;color:white;border:none;border-radius:5px;cursor:pointer;">
          Confirm Email
        </button>
      </a>
    `,
    };
    return mailOptions;
};
exports.default = mailHelper;
