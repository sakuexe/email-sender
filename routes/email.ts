import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// validation
import validateForm from "../validation/validate_email";

dotenv.config();

// check if the environment is development
const isDev = process.env.NODE_ENV === "dev";
const MAIN_USER = isDev ? process.env.DEV_USERNAME : process.env.USERNAME;
const MAIN_PASSWORD = isDev ? process.env.DEV_PASSWORD : process.env.PASSWORD;

const router = express.Router();

function validateLogIn(request: Request, response: Response, next: Function) {
  const username = request.body.username;
  const password = request.body.password;
  if (username === MAIN_USER && password === MAIN_PASSWORD) {
    next();
    return;
  }
  response.status(401).send("Invalid username or password");
}

router.post("/", validateLogIn, (request: Request, response: Response) => {
  console.log(request.body);
  response.render("email", { username: request.body.username });
});

function validationMiddleware(
  request: Request,
  response: Response,
  next: Function,
) {
  if (!validateForm(request, response)) {
    return;
  }
  next();
}

router.post(
  "/send",
  validationMiddleware,
  (request: Request, response: Response) => {
    console.log(`request: ${request.body}`);
    for (const key in request.body) {
      console.log(`key: ${key}, value: ${request.body[key]}`);
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

router.get("/success", (request: Request, response: Response) => {
  response.send("Email sent successfully!");
});

export default router;
