import { z } from "zod";

// Admin login validation
export const loginSchema = z.object({
  email: z.string().min(3, "email is required"),
  password: z.string().min(6, "Password is required"),
});
