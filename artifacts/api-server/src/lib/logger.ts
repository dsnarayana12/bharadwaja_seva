import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";

// In production (including serverless platforms like Vercel) we log
// synchronously to stdout. This avoids spawning worker threads for
// transports — which can leak between invocations and don't survive
// short-lived serverless containers.
export const logger = isProduction
  ? pino(
      {
        level: process.env.LOG_LEVEL ?? "info",
        redact: [
          "req.headers.authorization",
          "req.headers.cookie",
          "res.headers['set-cookie']",
        ],
      },
      pino.destination({ sync: true, dest: 1 }),
    )
  : pino({
      level: process.env.LOG_LEVEL ?? "info",
      redact: [
        "req.headers.authorization",
        "req.headers.cookie",
        "res.headers['set-cookie']",
      ],
      transport: {
        target: "pino-pretty",
        options: { colorize: true },
      },
    });
