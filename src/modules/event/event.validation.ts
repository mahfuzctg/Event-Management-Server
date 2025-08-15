import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required"),
  date: z.string().datetime({ message: "Valid date is required" }),
  endDate: z.string().optional(),
  location: z.string().optional(),
  image: z.string().optional(),
});

export const updateEventSchema = createEventSchema.partial();
