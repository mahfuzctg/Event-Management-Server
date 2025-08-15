import express from "express";
import cors from "cors";
import routes from "./routes";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", routes);

// Global Error Handler
// app.use(errorHandler);

export default app;
