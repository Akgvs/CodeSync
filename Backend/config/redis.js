import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

/**
 * Redis client singleton.
 *
 * Used for ephemeral room data (metadata + connected users).
 * MongoDB is still used for persistent User data (Clerk sync).
 */
const redis = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379", {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 200, 2000);
    console.log(`[Redis] Retrying connection in ${delay}ms (attempt ${times})`);
    return delay;
  },
  lazyConnect: false,
});

redis.on("connect", () => {
  console.log("[Redis] Connected to Redis");
});

redis.on("error", (err) => {
  console.error("[Redis Full Error]", err);
});

redis.on("error", (err) => {
  console.error("[Redis] Connection error:", err.message);
});

redis.on("close", () => {
  console.log("[Redis] Connection closed");
});

export default redis;
