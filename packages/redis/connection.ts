import type { RedisOptions } from "ioredis";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "../../.env.local");

config({
  path: envPath,
});

if (process.env.NODE_ENV !== "production") {
  console.log("Redis Connection Config:", {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });
}

export const connection: RedisOptions = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
  maxRetriesPerRequest: null,
  retryStrategy: (times) => Math.min(times * 50, 2000),
};
