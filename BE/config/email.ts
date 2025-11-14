import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async (options: EmailOptions) => {
  // 1. Create a transporter
  // This is the service that will send the email (e.g., Gmail, SendGrid).
  // For production, you'd use a transactional email service.
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: "dagoddesigns.com  <no_reply@dagoddesigns.com>", // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
    // You can also add an html property for styled emails
    // html: "<b>Hello world?</b>",
  };

  // 3. Actually send the email
  await transporter.sendMail(mailOptions);
};
