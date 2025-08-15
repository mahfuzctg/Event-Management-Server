import app from "./app";
import { connectDB } from "./config/db";
import { PORT } from "./config/env";

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
