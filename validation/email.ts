import express, { Request, Response, NextFunction } from "express";

export default function validateEmail(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { fromEmail, toEmail, message, honeypot } = request.body;

  if (!fromEmail || !toEmail || !message) {
    response
      .status(400)
      .send("Please fill out the fromEmail, toEmail and message fields.");
    return;
  }

  if (!fromEmail.includes("@") || !toEmail.includes("@")) {
    response.status(400).send("Please enter a valid email address.");
    return;
  }

  if (honeypot) {
    console.error(`Form filled out by bot: ${honeypot}`);
    response.status(400).send("Form filled out by bot.");
    return;
  }

  next();
}
