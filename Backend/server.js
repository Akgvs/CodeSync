import { createServer } from "http";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { setupWebSockets } from "./sockets/index.js";
import app from "./app.js";

// Load env vars
dotenv.config();

const startServer = async () => {
  await connectDB();

  const httpServer = createServer(app);
  setupWebSockets(httpServer);

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

