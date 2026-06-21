import { Server } from "socket.io";
import { YSocketIO } from "y-socket.io/dist/server";
import { registerRoomHandler } from "./roomHandler.js";

/**
 * Initializes and configures the WebSocket server.
 *
 * Two concerns are handled here:
 *  1. Yjs CRDT sync — via y-socket.io's YSocketIO (uses its own namespaces per room)
 *  2. Application events — via our roomHandler on the main "/" namespace
 *     (join-room, leave-room, user presence)
 *
 * @param {import("http").Server} httpServer - The core HTTP server instance
 * @returns {import("socket.io").Server} The Socket.IO server instance
 */
export const setupWebSockets = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || "*",
      methods: ["GET", "POST"],
    },
  });

  // ── 1. Yjs CRDT Sync ──────────────────────────────────────
  // YSocketIO creates namespaces like /<roomId> for each room.
  // It handles Yjs document sync, awareness, and state vectors internally.
  // const ySocketIO = new YSocketIO(io);
  // ySocketIO.initialize();
  // console.log("[WebSocket] Yjs sync layer (y-socket.io) initialized");

  // ── 2. Application Events (Room Presence) ──────────────────
  // The main namespace handles our custom room management events.
  io.on("connection", (socket) => {
    console.log(`[WebSocket] Client connected: ${socket.id}`);

    // Register all room-related event handlers for this socket
    registerRoomHandler(io, socket);
  });

  return io;
};
