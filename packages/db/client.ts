import { config } from "dotenv";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";

config({
  path: ".env.local",
});

export const db: LibSQLDatabase = drizzle({
  connection: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});
