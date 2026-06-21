import express from "express";
import cors from "cors";
import { loggerMiddleware } from "./middlewares/loggerMiddleware.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

import healthRoutes from "./routes/healthRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

import { clerkMiddleware } from '@clerk/express';
import { mockAuthMiddleware } from "./middlewares/mockAuth.js";

// Global Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
}));
app.use(express.json());
app.use(loggerMiddleware);
app.use(clerkMiddleware());
app.use(mockAuthMiddleware);

// API Routes
app.use("/", healthRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/users", userRoutes);

// Error Handling Middlewares (Must be at the end)
app.use(notFound);
app.use(errorHandler);

export default app;
