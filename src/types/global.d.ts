import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: Types.ObjectId | string;
        role: string;
      };
    }
  }
}

export {};
