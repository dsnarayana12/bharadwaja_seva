import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

const connectionString =
  process.env.EXTERNAL_DATABASE_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "EXTERNAL_DATABASE_URL (preferred) or DATABASE_URL must be set.",
  );
}

const isLocal = /@(localhost|127\.0\.0\.1|::1)[:\/]/i.test(connectionString);
const hasSslDisable = /sslmode=disable/i.test(connectionString);
const needsSsl = !isLocal && !hasSslDisable;

export const pool = new Pool({
  connectionString,
  ...(needsSsl ? { ssl: { rejectUnauthorized: false } } : {}),
});
export const db = drizzle(pool, { schema });

export * from "./schema";
