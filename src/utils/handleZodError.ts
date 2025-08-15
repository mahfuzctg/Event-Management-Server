import { ZodError, ZodIssue } from "zod";
import { Response } from "express";

export const handleZod = (err: ZodError, res: Response) => {
  const errors = err.issues.map((e: ZodIssue) => ({
    field: e.path.join(".") || "unknown",
    message: e.message,
    received: (e as any).received,
    code: e.code
  }));

  return res.status(400).json({
    success: false,
    message: "Validation failed",
    errors,
  });
};
