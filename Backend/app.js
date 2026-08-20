import express from "express";
import cors from "cors";
import { clerkMiddleware } from '@clerk/express';
import { loggerMiddleware } from "./middlewares/loggerMiddleware.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

import healthRoutes from "./routes/healthRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

// Global Middlewares
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://code-sync-nu-nine.vercel.app",
  "http://localhost:5173",
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(loggerMiddleware);
app.use(clerkMiddleware());
// app.use(mockAuthMiddleware);

// API Routes
app.use("/", healthRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/users", userRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/payment", paymentRoutes);

// Error Handling Middlewares (Must be at the end)
app.use(notFound);
app.use(errorHandler);

export default app;
