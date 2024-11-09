import nodemailer from "nodemailer";
import config from "../config/envConfig.js";

export default async function sendEmail(options) {
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
}
