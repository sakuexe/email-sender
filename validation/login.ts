import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const isDev = process.env.NODE_ENV === "dev";
const MAIN_USER = isDev ? process.env.DEV_USERNAME : process.env.USERNAME;
const MAIN_PASSWORD = isDev
  ? process.env.DEV_PASSWORD
  : process.env.TESTING_PASSWORD;

export default function validateLogIn(
  request: Request,
  response: Response,
  next: Function,
) {
  const username = request.body.username;
  const password = request.body.password;
  if (username === MAIN_USER && password === MAIN_PASSWORD) {
    next();
    return;
  }
  response.status(401).send("Invalid username or password");
}
