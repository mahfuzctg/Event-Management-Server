import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";
import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Optional: log all incoming requests for debug
app.use((req, _res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

// check or root route for Vercel or monitoring
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "events managements  is running successfully!",
  });
});

// API Routes
app.use("/api", router);

// Handle 404 Not Found
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    errors: [{ path: _req.path, message: "Route not found" }],
  });
});

// Global Error Handler
app.use(errorHandler);

export default app;