import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "./event.controller";
import { authMiddleware} from "../../middlewares/auth.middleware"; 

const router = Router();

// Public routes
router.get("/", getAllEvents);
router.get("/:id", getEventById);

//  (protected)
router.post("/", authMiddleware, createEvent);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

export default router;
