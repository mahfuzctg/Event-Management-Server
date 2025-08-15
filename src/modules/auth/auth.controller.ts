import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthService } from "./auth.service";
import { loginSchema } from "./auth.validation";

// POST /api/auth/login
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = loginSchema.parse(req.body);

  const token = await AuthService.login(email, password);

  res.status(200).json({
    success: true,
    token,
  });
});
