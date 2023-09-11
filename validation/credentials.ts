import dotenv from "dotenv";

export default function validateCredentials() {
  dotenv.config();
  const isDev = process.env.NODE_ENV === "dev";
  // email testing credentials
  const MAIN_USER = isDev ? process.env.DEV_USERNAME : process.env.USERNAME;
  const MAIN_PASSWORD = isDev ? process.env.DEV_PASSWORD : process.env.PASSWORD;
  if (!MAIN_PASSWORD) {
    throw new Error("PASSWORD for testing is not defined");
  }
  if (!MAIN_USER) {
    throw new Error("USERNAME for testing is not defined");
  }
  // gmail credentials
  const GMAIL = process.env.EMAIL;
  const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
  if (!GMAIL_PASSWORD) {
    throw new Error("GMAIL_PASSWORD variable is not defined");
  }
  if (!GMAIL) {
    throw new Error("GMAIL variable is not defined");
  }
}
