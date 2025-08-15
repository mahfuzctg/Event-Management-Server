import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { EventService } from "./event.service";
import { createEventSchema, updateEventSchema } from "./event.validation";

// Create Event (Admin only)
export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  const data = createEventSchema.parse(req.body);
  const event = await EventService.createEvent(data);
  res.status(201).json({ success: true, event });
});

// Get All Events (Public)
export const getAllEvents = asyncHandler(async (_req: Request, res: Response) => {
  const events = await EventService.getAllEvents();
  res.status(200).json({ success: true, events });
});

// Get Event by ID (Public)
export const getEventById = asyncHandler(async (req: Request, res: Response) => {
  const event = await EventService.getEventById(req.params.id);
  if (!event) return res.status(404).json({ success: false, message: "Event not found" });
  res.status(200).json({ success: true, event });
});

// Update Event (Admin only)
export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  const data = updateEventSchema.parse(req.body);
  const event = await EventService.updateEvent(req.params.id, data);
  if (!event) return res.status(404).json({ success: false, message: "Event not found" });
  res.status(200).json({ success: true, event });
});

// Delete Event (Admin only)
export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  const event = await EventService.deleteEvent(req.params.id);
  if (!event) return res.status(404).json({ success: false, message: "Event not found" });
  res.status(200).json({ success: true, message: "Event deleted" });
});
