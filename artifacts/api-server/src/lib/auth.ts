import type { Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "@workspace/db";

declare module "express-session" {
  interface SessionData {
    adminUser?: { username: string };
  }
}

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable is required.");
}

const isProd = process.env.NODE_ENV === "production";

// Use a Postgres-backed session store so sessions survive serverless cold
// starts (e.g. on Vercel) and process restarts.
//
// We create the `session` table inline (instead of relying on
// connect-pg-simple's `createTableIfMissing`) because that option reads a
// sibling `table.sql` file at runtime, which doesn't survive esbuild
// bundling.
//
// DDL is split into individual statements so that we can narrow the PK
// duplicate-object swallow to ONLY the expected pg error codes (42P16
// invalid_table_definition / 42710 duplicate_object), instead of
// suppressing every error class.
const SESSION_TABLE_DDL_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire")`,
];

async function ensureSessionTable(): Promise<void> {
  for (const sql of SESSION_TABLE_DDL_STATEMENTS) {
    await pool.query(sql);
  }
  try {
    await pool.query(
      `ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid")`,
    );
  } catch (err) {
    // 42P16 invalid_table_definition / 42710 duplicate_object — the PK
    // already exists. Anything else is a real failure and should bubble.
    const code = (err as { code?: string }).code;
    if (code !== "42P16" && code !== "42710") throw err;
  }
}

// Kick off the table creation eagerly. We also expose the promise so the
// middleware can await it on the first request that actually touches a
// session, eliminating the cold-start race.
let sessionTableReady: Promise<void> = ensureSessionTable();

const PgSession = connectPgSimple(session);
const sessionStore = new PgSession({
  pool,
  tableName: "session",
  createTableIfMissing: false,
});

const innerSessionMiddleware = session({
  store: sessionStore,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  },
});

// Wrapper that awaits the (cached) DDL promise once before delegating to
// express-session. After the first successful resolution this is a no-op,
// so it adds essentially zero overhead per request.
export function sessionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  sessionTableReady.then(
    () => innerSessionMiddleware(req, res, next),
    (err: unknown) => {
      // Reset the promise so the next request retries the DDL instead of
      // being permanently broken by a transient DB blip during cold start.
      sessionTableReady = ensureSessionTable();
      next(err as Error);
    },
  );
}

export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!req.session?.adminUser) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

export function getAdminCredentials(): { username: string; password: string } | null {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) return null;
  return { username, password };
}
