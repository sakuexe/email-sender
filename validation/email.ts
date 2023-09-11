import express, { Request, Response, NextFunction } from "express";
import validateCredentials from "../validation/credentials";

export default function validateEmail(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    validateCredentials();
  } catch (error) {
    response.status(500).send(error);
  }

  const { toEmail, message, honeypot } = request.body;

  if (!toEmail || !message) {
    response.status(400).send("Please fill out all required fields");
    return;
  }

  if (!toEmail.includes("@")) {
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
