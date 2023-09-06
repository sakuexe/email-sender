import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(8000, () => {
  console.log(`[server]: Server is running at http://localhost:8000`);
});
