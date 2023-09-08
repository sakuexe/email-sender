import { Response, Request, NextFunction } from "express";

const isDevelopment = process.env.NODE_ENV === "dev";

export default function validateForm(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (isDevelopment) {
    request.body.development = true;
  }
  if (request.body.development === "true") {
    request.body.development = true;
  }
  next();
}
