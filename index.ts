import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import http from "http";
import https from "https";
import fs from "fs";

import dotenv from "dotenv";

import router from "./routes/email";

const PORT = process.env.PORT || 5000;
const credentials = {
  key: fs.readFileSync("./ssl/key.pem", "utf8"),
  cert: fs.readFileSync("./ssl/cert.pem", "utf8"),
};

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

// creating the http and https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080, () => {
  console.log(`[server]: Server is running at http://localhost:8080`);
});

httpsServer.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
