import express, { Express, Request, Response } from "express";
import { connectDatabase } from "./config/database";
import mongoose from "mongoose";
import { User } from "./models/user";

const app: Express = express();
const port = 3000;
app.use(express.json()); // Add this middleware to parse JSON bodies

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

// Test route for User model
app.post("/test-user", async (req: Request, res: Response) => {
  try {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });

    const savedUser = await newUser.save();
    res.json({
      status: "success",
      user: {
        email: savedUser.email,
        name: savedUser.name,
        createdAt: savedUser.createdAt,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});

// Add new GET endpoint to view all users
app.get("/users", async (_req: Request, res: Response) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password field
    res.json({
      status: "success",
      count: users.length,
      users: users,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

app.get("/ping", (_req: Request, res: Response) => {
  res.json({ message: "pong" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
