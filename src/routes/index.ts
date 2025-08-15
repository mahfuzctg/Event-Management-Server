import express from "express";



const router = express.Router();

// Correct usage: pass route handlers
router.use("/auth", authRoutes);


export default router;
