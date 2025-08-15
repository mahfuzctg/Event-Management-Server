// src/modules/event/event.controller.ts
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { EventService } from "./event.service";
import { createEventSchema, updateEventSchema } from "./event.validation";
import { handleZod } from "../../utils/handleZodError";

/**
 * @desc Create a new event (Admin only)
 */
export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  try {
    const data = createEventSchema.parse(req.body);

    const event = await EventService.createEvent({
      ...data,
      date: new Date(data.date),
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    });

    res.status(201).json({ success: true, event }); // return na, just call
  } catch (err: any) {
    if (err.name === "ZodError") {
      handleZod(err, res); // call handleZod, don't return
      return; // stop execution
    }
    throw err;
  }
});


/**
 * @desc Update existing event (Admin only)
 */
export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  try {
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
  } catch (err: any) {
  if (err.name === "ZodError") {
      handleZod(err, res); 
      return; // stop execution
    }
    throw err;
  }
});

/**
 * @desc Get all events (Public)
 */
export const getAllEvents = asyncHandler(async (_req: Request, res: Response) => {
  const events = await EventService.getAllEvents();
  res.status(200).json({ success: true, events });
});

/**
 * @desc Get single event by ID (Public)
 */
export const getEventById = asyncHandler(async (req: Request, res: Response) => {
  const event = await EventService.getEventById(req.params.id);

  if (!event) {
    res.status(404).json({ success: false, message: "Event not found" });
    return;
  }

  res.status(200).json({ success: true, event });
});

/**
 * @desc Delete event by ID (Admin only)
 */
export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  const event = await EventService.deleteEvent(req.params.id);

  if (!event) {
    res.status(404).json({ success: false, message: "Event not found" });
    return;
  }

  res.status(200).json({ success: true, message: "Event deleted" });
});
