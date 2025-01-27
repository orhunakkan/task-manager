import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

app.get("/ping", (_req: Request, res: Response) => {
  res.json({ message: "pong" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
