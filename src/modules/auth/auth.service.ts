import { UserModel } from "./auth.model";
import { IUserDoc } from "./auth.interface";
import { signToken } from "../../utils/jwt";

export class AuthService {
  static async login(email: string, password: string): Promise<string> {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await (user as IUserDoc).comparePassword(password);
    if (!isMatch) throw new Error("Invalid email or password");

    // Use your signToken util
    const token = signToken({ username: user.email, role: user.role });
    return token;
  }
}
