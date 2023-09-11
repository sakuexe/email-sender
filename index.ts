import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";

import dotenv from "dotenv";

import router from "./routes/email";
dotenv.config();

const app = express();

app.set("view engine", "ejs");

// allow to parse json information from the request body
app.use(express.json());

// this is a way to use middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// log in screen
app.use(express.static("public"));

const useRouter = router;
app.use("/email", useRouter);

app.listen(5000, () => {
  console.log(`[server]: Server is running at http://localhost:8000`);
});
