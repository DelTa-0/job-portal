const passwordHelper = (recipient: string, verificationLink: string) => {
  const mailOptions = {
    from: "no-reply@example.com",
    to: recipient,
    subject: "change password! Verify your email",
    html: `
      <p>Click the button below to verify your email!to change password</p>
      <a href="${verificationLink}">
        <button style="padding:10px 20px;background:#4CAF50;color:white;border:none;border-radius:5px;cursor:pointer;">
          Confirm Email
        </button>
      </a>
    `,
  };
  return mailOptions;
};
export default passwordHelper