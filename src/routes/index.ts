import express from "express";
import authRoutes from "./auth.route";


const router = express.Router();

// Correct usage: pass route handlers
router.use("/auth", authRoutes);
router.use("/events", eventRoutes);

export default router;
