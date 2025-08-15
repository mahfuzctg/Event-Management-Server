// File: src/utils/jwt.ts

import jwt, { Secret, SignOptions } from "jsonwebtoken";
import env from "../config/env";

export interface JwtPayload {
  username: string;
  role: string;
}

// Make sure the secret is typed correctly
const JWT_SECRET: Secret = env.JWT_SECRET;

export const signToken = (
  payload: JwtPayload,
  expiresIn: string = env.JWT_EXPIRES_IN
): string => {
  // Explicitly define options type
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
