import redis from "../config/redis.js";

/**
 * RoomManager — Redis-backed room & user tracking service.
 *
 * Redis key structure:
 *   room:{roomId}:meta    → Hash  { name, language, privacy, ownerId, createdAt }
 *   room:{roomId}:users   → Hash  { socketId1: JSON(userData), socketId2: JSON(userData) }
 *   socket:{socketId}     → String roomId  (reverse lookup for disconnect cleanup)
 *
 * All operations are async since Redis calls are I/O-bound.
 * The in-memory Maps from the previous version are fully replaced.
 */

// ── Room Metadata ──────────────────────────────────────────

/**
 * Create a new room in Redis with its metadata.
 * @param {string} roomId
 * @param {{ name: string, language: string, privacy: string, ownerId: string }} meta
 * @returns {Promise<void>}
 */
export async function createRoom(roomId, meta) {
  const key = `room:${roomId}:meta`;
  await redis.hset(key, {
    roomId,
    name: meta.name,
    language: meta.language || "javascript",
    privacy: meta.privacy || "public",
    ownerId: meta.ownerId,
    createdAt: new Date().toISOString(),
  });

  console.log(`[RoomManager] Room "${roomId}" created in Redis`);
}

/**
 * Get room metadata from Redis.
 * @param {string} roomId
 * @returns {Promise<object|null>} Room metadata or null if not found
 */
export async function getRoom(roomId) {
  const key = `room:${roomId}:meta`;
  const data = await redis.hgetall(key);

  // hgetall returns {} for non-existent keys
  if (!data || Object.keys(data).length === 0) {
    return null;
  }
  return data;
}

/**
 * Delete room metadata and user tracking from Redis.
 * @param {string} roomId
 * @returns {Promise<void>}
 */
export async function deleteRoom(roomId) {
  await redis.del(`room:${roomId}:meta`, `room:${roomId}:users`);
  console.log(`[RoomManager] Room "${roomId}" data cleaned up from Redis`);
}

// ── User Presence Tracking ─────────────────────────────────

/**
 * Add a user to a room's connected-users set.
 * Also stores a reverse lookup (socketId → roomId) for disconnect cleanup.
 * @param {string} roomId
 * @param {string} socketId
 * @param {{ id: string, name: string, avatar: string }} userData
 * @returns {Promise<void>}
 */
export async function joinRoom(roomId, socketId, userData) {
  const usersKey = `room:${roomId}:users`;
  const socketKey = `socket:${socketId}`;

  // Store user data as JSON in the room's users hash
  await redis.hset(usersKey, socketId, JSON.stringify(userData));

  // Reverse lookup: socketId → roomId (for disconnect cleanup)
  await redis.set(socketKey, roomId);

  const userCount = await redis.hlen(usersKey);
  console.log(`[RoomManager] User "${userData.name}" (${socketId}) joined room "${roomId}" — ${userCount} user(s)`);
}

/**
 * Remove a user from a room. Returns the updated user list.
 * @param {string} roomId
 * @param {string} socketId
 * @returns {Promise<Array<{ socketId: string, id: string, name: string, avatar: string }>>}
 */
export async function leaveRoom(roomId, socketId) {
  const usersKey = `room:${roomId}:users`;
  const socketKey = `socket:${socketId}`;

  // Get user data before removing (for logging)
  const userJson = await redis.hget(usersKey, socketId);
  const user = userJson ? JSON.parse(userJson) : null;

  // Remove from room users hash and reverse lookup
  await redis.hdel(usersKey, socketId);
  await redis.del(socketKey);

  console.log(`[RoomManager] User "${user?.name || socketId}" left room "${roomId}"`);

  return getRoomUsers(roomId);
}

/**
 * Get all connected users in a room.
 * @param {string} roomId
 * @returns {Promise<Array<{ socketId: string, id: string, name: string, avatar: string }>>}
 */
export async function getRoomUsers(roomId) {
  const usersKey = `room:${roomId}:users`;
  const data = await redis.hgetall(usersKey);

  if (!data || Object.keys(data).length === 0) {
    return [];
  }

  return Object.entries(data).map(([socketId, json]) => ({
    socketId,
    ...JSON.parse(json),
  }));
}

/**
 * Reverse lookup: find which room a socket belongs to.
 * Used during disconnect when the client can't send the roomId.
 * @param {string} socketId
 * @returns {Promise<string|null>}
 */
export async function getRoomForSocket(socketId) {
  return redis.get(`socket:${socketId}`);
}

/**
 * Check whether a room has zero connected users.
 * @param {string} roomId
 * @returns {Promise<boolean>}
 */
export async function isRoomEmpty(roomId) {
  const count = await redis.hlen(`room:${roomId}:users`);
  return count === 0;
}

/**
 * Get count of active rooms (rooms with at least one user or metadata).
 * Uses Redis SCAN to avoid blocking — safe for production.
 * @returns {Promise<number>}
 */
export async function getActiveRoomCount() {
  let cursor = "0";
  const roomIds = new Set();

  do {
    const [nextCursor, keys] = await redis.scan(cursor, "MATCH", "room:*:meta", "COUNT", 100);
    cursor = nextCursor;
    keys.forEach((key) => {
      const roomId = key.split(":")[1];
      roomIds.add(roomId);
    });
  } while (cursor !== "0");

  return roomIds.size;
}
