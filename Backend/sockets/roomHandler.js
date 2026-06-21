import * as RoomManager from "../services/roomManager.js";
import * as YjsManager from "../services/yjsManager.js";

/**
 * Room Socket Handler — Manages application-level room events.
 *
 * Events handled:
 *   "join-room"  → Client wants to join a room
 *   "leave-room" → Client explicitly leaves a room
 *   "disconnect"  → Client disconnected (cleanup)
 *
 * Events emitted:
 *   "room:users-updated" → Broadcast to room when user list changes
 *
 * All RoomManager calls are async (Redis-backed).
 *
 * @param {import("socket.io").Server} io - The Socket.IO server instance
 * @param {import("socket.io").Socket} socket - The connected socket
 */
export function registerRoomHandler(io, socket) {
  /**
   * Handle "join-room" event.
   * @param {{ roomId: string, user: { id: string, name: string, avatar: string } }} data
   */
  socket.on("join-room", async (data) => {
    try {
      const { roomId, user } = data;

      if (!roomId || !user) {
        socket.emit("error", { message: "Missing roomId or user data" });
        return;
      }

      // If this socket is already in another room, leave it first
      const currentRoom = await RoomManager.getRoomForSocket(socket.id);
      if (currentRoom && currentRoom !== roomId) {
        await handleLeaveRoom(io, socket, currentRoom);
      }

      // Join the Socket.IO room (for scoped broadcasting)
      socket.join(roomId);

      // Track user in Redis
      await RoomManager.joinRoom(roomId, socket.id, user);

      // Ensure a Y.Doc exists for this room (cancel cleanup if pending)
      YjsManager.getOrCreateDoc(roomId);

      // Broadcast updated user list to everyone in this room
      const users = await RoomManager.getRoomUsers(roomId);
      io.to(roomId).emit("room:users-updated", { roomId, users });

      console.log(`[RoomHandler] "${user.name}" joined room "${roomId}"`);
    } catch (err) {
      console.error(`[RoomHandler] Error in join-room:`, err);
      socket.emit("error", { message: "Failed to join room" });
    }
  });

  /**
   * Handle explicit "leave-room" event.
   * @param {{ roomId: string }} data
   */
  socket.on("leave-room", async (data) => {
    try {
      const { roomId } = data;
      if (!roomId) return;

      await handleLeaveRoom(io, socket, roomId);
    } catch (err) {
      console.error(`[RoomHandler] Error in leave-room:`, err);
    }
  });

  /**
   * Handle disconnect — clean up whatever room the socket was in.
   */
  socket.on("disconnect", async () => {
    try {
      const roomId = await RoomManager.getRoomForSocket(socket.id);
      if (roomId) {
        await handleLeaveRoom(io, socket, roomId);
      }
      console.log(`[RoomHandler] Socket ${socket.id} disconnected`);
    } catch (err) {
      console.error(`[RoomHandler] Error in disconnect cleanup:`, err);
    }
  });
}

/**
 * Shared logic for leaving a room (used by both "leave-room" and "disconnect").
 * @param {import("socket.io").Server} io
 * @param {import("socket.io").Socket} socket
 * @param {string} roomId
 */
async function handleLeaveRoom(io, socket, roomId) {
  // Leave the Socket.IO room
  socket.leave(roomId);

  // Remove from Redis (returns remaining users)
  const remainingUsers = await RoomManager.leaveRoom(roomId, socket.id);

  // Broadcast updated user list to remaining users in the room
  io.to(roomId).emit("room:users-updated", { roomId, users: remainingUsers });

  // If room is now empty, schedule Y.Doc cleanup and delete room data from Redis
  const empty = await RoomManager.isRoomEmpty(roomId);
  if (empty) {
    YjsManager.scheduleCleanup(roomId);
    await RoomManager.deleteRoom(roomId);
  }
}
