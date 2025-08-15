import express from "express";
import authRoutes from "../modules/auth/auth.route";



const router = express.Router();

// Correct usage: pass route handlers
router.use("/auth", authRoutes);


export default router;
