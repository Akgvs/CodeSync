import { createServer } from "http";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { setupWebSockets } from "./sockets/index.js";
import app from "./app.js";

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Create core HTTP server using the configured Express app
const httpServer = createServer(app);

// Setup WebSockets
setupWebSockets(httpServer);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:");
  console.error(err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:");
  console.error(err);
});