import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// validation
import validateEmail from "../validation/email";
import validateLogIn from "../validation/login";
import validateForm from "../validation/devform";

dotenv.config();

const router = express.Router();

router
  .route("/")
  .get((request: Request, response: Response) => {
    response.redirect("/");
  })
  .post(validateLogIn, (request: Request, response: Response) => {
    console.log(request.body);
    response.render("email", { username: request.body.username });
  });

router.post(
  "/send",
  validateEmail,
  validateForm,
  (request: Request, response: Response) => {
    console.log(request.body);

    let defaultSubject = "Contact form from website";
    if (request.headers["accept-language"]?.match("^(fi-FI)")) {
      defaultSubject = "Sähköpostilomake sivustolta";
    }

    if (request.body.development) {
      response.status(200).json({
        status: 200,
        verbal: "Email sent successfully",
        email: {
          from: process.env.EMAIL,
          to: request.body.toEmail,
          subject: request.body.subject || defaultSubject,
          text: request.body.message,
          honey: request.body.honeypot,
          language: request.headers["accept-language"],
        },
      });
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: request.body.toEmail,
      subject: request.body.subject || defaultSubject,
      text: request.body.message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`${error}`);
        response.status(500).json({
          status: 500,
          error: error,
          info: info,
          verbal: "Error while sending email",
          email: mailOptions,
        });
        return;
      }

      response.json({
        status: 200,
        info: info,
        verbal: "Email sent successfully",
        email: mailOptions,
      });
    });
  },
);

export default router;
