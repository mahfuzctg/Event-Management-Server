import mongoose from "mongoose";
import env from "../config/env";
import { UserModel } from "../modules/auth/auth.model";

const createAdmin = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("Connected to MongoDB");

    const exists = await UserModel.findOne({ email: env.ADMIN_EMAIL });
    if (!exists) {
      const admin = new UserModel({
        email: env.ADMIN_EMAIL,
        password: env.ADMIN_PASSWORD,
        role: "admin",
      });
      await admin.save(); // save the document
      console.log("Admin created!");
    } else {
      console.log("Admin already exists!");
    }

    mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
};

createAdmin();
