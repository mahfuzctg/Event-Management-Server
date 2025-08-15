import app from "./app";
import env from "./config/env";
import { connectDB } from "./config/db";

const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB

    app.listen(env.PORT, () => {
      console.log(`Server running on http://localhost:${env.PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
