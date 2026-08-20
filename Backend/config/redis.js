import Redis from "ioredis";
import RedisMock from "ioredis-mock";
import dotenv from "dotenv";

dotenv.config();

let client;
let isUsingMock = false;

const mockRedis = new RedisMock();

// Default to in-memory mock until real Redis connects
client = mockRedis;
isUsingMock = true;

if (process.env.USE_MOCK_REDIS === "true" || process.env.REDIS_URL === "mock") {
  console.log("[Redis] Configured to use in-memory Redis mock");
} else {
  const realRedis = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379", {
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    retryStrategy(times) {
      if (times > 1) {
        return null;
      }
      return 200;
    },
    lazyConnect: false,
  });

  realRedis.on("connect", () => {
    console.log("[Redis] Connected to Redis server");
    client = realRedis;
    isUsingMock = false;
  });

  realRedis.on("error", (err) => {
    if (!isUsingMock) {
      console.warn(`[Redis] Connection issue (${err.message}). Using in-memory Redis mock.`);
      client = mockRedis;
      isUsingMock = true;
    }
  });
}

const redisProxy = new Proxy({}, {
  get(target, prop) {
    const activeClient = client || mockRedis;
    const value = activeClient[prop];
    if (typeof value === "function") {
      return value.bind(activeClient);
    }
    return value;
  }
});

export default redisProxy;
