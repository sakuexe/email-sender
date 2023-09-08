import express, { Request, Response, NextFunction } from "express";

export default function validateForm(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { fromEmail, toEmail, message } = request.body;

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

  next();
}
