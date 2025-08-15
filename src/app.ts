import express from "express";
import cors from "cors";
import routes from "./routes";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

// Error middleware
app.use();
// app.use(errorHandler);

export default app;
