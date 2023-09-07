import express, { Request, Response } from "express";
import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/send", (request: Request, response: Response) => {
  console.log(`request: ${request.body}`);

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

app.get("/success", (request: Request, response: Response) => {
  response.send("Email sent successfully!");
});

app.listen(8000, () => {
  console.log(`[server]: Server is running at http://localhost:8000`);
});
