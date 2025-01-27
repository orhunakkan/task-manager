import express, { Express, Request, Response } from "express";
import { connectDatabase } from "./config/database";
import mongoose from "mongoose";

const app: Express = express();
const port = 3000;

// Connect to MongoDB
connectDatabase();

// Test route for database connection
app.get("/db-test", async (_req: Request, res: Response) => {
  try {
    const { readyState } = mongoose.connection;
    const states = ["disconnected", "connected", "connecting", "disconnecting"];
    res.json({
      status: "success",
      message: `Database connection status: ${states[readyState]}`,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Database connection test failed",
    });
  }
});

app.get("/ping", (_req: Request, res: Response) => {
  res.json({ message: "pong" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
