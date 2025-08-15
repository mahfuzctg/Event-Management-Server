import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.string().datetime({ message: "Valid start date is required (ISO 8601 format)" }),
  endDate: z
    .string()
    .datetime({ message: "Valid end date is required (ISO 8601 format)" })
    .optional(),
  location: z.string().optional(),
  image: z.string().optional(),
});

export const updateEventSchema = createEventSchema.partial();
