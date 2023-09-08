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
    if (request.body.development) {
      response.render("success", {
        to: request.body.toEmail,
        from: request.body.fromEmail,
        message: request.body.message,
      });
      return;
    }

    response.send("Sending email...");

    return;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "Sending Email using Node.js",
      text: "Hello World!",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`error: ${error}`);
      } else {
        console.log(`Email sent: ${info.response}`);
        response.redirect("/success");
      }
    });
  },
);

router.post(
  "/success",
  validateForm,
  (request: Request, response: Response) => {
    response.send("Email sent successfully!");
  },
);

export default router;
