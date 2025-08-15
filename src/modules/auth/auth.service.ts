import { UserModel } from "./auth.model";
import { IUserDoc } from "./auth.interface";
import jwt from "jsonwebtoken";
import env from "../../config/env";

export class AuthService {
  // Login admin and return JWT
  static async login(username: string, password: string): Promise<string> {
    const user = await UserModel.findOne({ username });
    if (!user) throw new Error("Invalid username or password");

    const isMatch = await (user as IUserDoc).comparePassword(password);
    if (!isMatch) throw new Error("Invalid username or password");

    const token = jwt.sign({ id: user._id, role: user.role }, env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return token;
  }
}
