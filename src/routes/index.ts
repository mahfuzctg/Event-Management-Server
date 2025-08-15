import express from "express";
import authRoutes from "../modules/auth/auth.route";
import eventRoutes from "../modules/event/event.route";



const router = express.Router();

// Correct usage: pass route handlers
router.use("/auth", authRoutes);
router.use("/event", eventRoutes);


export default router;
