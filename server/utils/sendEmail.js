import nodemailer from "nodemailer";
import config from "../config/envConfig.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";

export default catchAsyncError(async function sendEmail(options) {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: config.SMTP_EMAIL,
      pass: config.SMTP_PASSWORD,
    },
  });
  await transport.sendMail(options);
});
