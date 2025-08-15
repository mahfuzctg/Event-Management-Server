import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { EventService } from "./event.service";
import { createEventSchema, updateEventSchema } from "./event.validation";

export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  const data = createEventSchema.parse(req.body);

  const event = await EventService.createEvent({
    ...data,
    date: new Date(data.date),
    endDate: data.endDate ? new Date(data.endDate) : undefined,
  });

  res.status(201).json({ success: true, event });
});

export const getAllEvents = asyncHandler(async (_req: Request, res: Response) => {
  const events = await EventService.getAllEvents();
  res.status(200).json({ success: true, events });
});

export const getEventById = asyncHandler(async (req: Request, res: Response) => {
  const event = await EventService.getEventById(req.params.id);
  if (!event) {
    res.status(404).json({ success: false, message: "Event not found" });
    return;
  }
  res.status(200).json({ success: true, event });
});

export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  const data = updateEventSchema.parse(req.body);

  const updatedEvent = await EventService.updateEvent(req.params.id, {
    ...data,
    date: data.date ? new Date(data.date) : undefined,
    endDate: data.endDate ? new Date(data.endDate) : undefined,
  });

  if (!updatedEvent) {
    res.status(404).json({ success: false, message: "Event not found" });
    return;
  }
  res.status(200).json({ success: true, event: updatedEvent });
});

export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  const event = await EventService.deleteEvent(req.params.id);
  if (!event) {
    res.status(404).json({ success: false, message: "Event not found" });
    return;
  }
  res.status(200).json({ success: true, message: "Event deleted" });
});
