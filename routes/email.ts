import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// validation
import validateForm from "../validation/email";
import validateLogIn from "../validation/login";

dotenv.config();

const router = express.Router();

router.post("/", validateLogIn, (request: Request, response: Response) => {
  console.log(request.body);
  response.render("email", { username: request.body.username });
});

router.post("/send", validateForm, (request: Request, response: Response) => {
  console.log(`request: ${request.body}`);

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
});

router.get("/success", (request: Request, response: Response) => {
  response.send("Email sent successfully!");
});

export default router;
