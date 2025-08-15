import { Document } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  role: "admin";
}

export interface IUserDoc extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}
