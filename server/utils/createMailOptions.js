import config from "../config/envConfig.js";
export default function createMailOption(token, userEmail, subject, html) {
  const options = { to: userEmail, subject, from: config.SMTP_EMAIL, html };
  const verificationUrl = `${config.EMAIL_VERIFY_LINK}/api/v1/auth/verify?token=${token}`;
  if (!options.html) {
    options.html = `<html>
    <body>
      <h2>Verify Your Email Address</h2>
      <p>Thank you for registering with us. Please click the link below to verify your email address:</p>
      <a href="${verificationUrl}" target="_blank" style="padding: 10px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
        Click here to verify your email
      </a>
      <p>If you did not request this, please ignore this email.</p>
    </body>
  </html>
`;
  }
  return options;
}
