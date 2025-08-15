import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "./event.controller";
import { authMiddleware} from "../../middlewares/auth.middleware"; 

const eventRoutes = Router();

// Public routes
eventRoutes.get("/", getAllEvents);
eventRoutes.get("/:id", getEventById);

//  (protected)
eventRoutes.post("/", authMiddleware, createEvent);
eventRoutes.put("/:id", authMiddleware, updateEvent);
eventRoutes.delete("/:id", authMiddleware, deleteEvent);

export default eventRoutes;
