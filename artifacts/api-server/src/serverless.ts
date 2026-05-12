// Vercel serverless entrypoint: just exports the configured Express app.
//
// We deliberately do NOT trigger seed-on-load here. On Vercel the module is
// re-evaluated on every cold start, and on horizontal scale-out multiple
// containers can boot concurrently — racing on `seedIfEmpty` would risk
// duplicate seed rows. Seeding is a one-shot operation; run it explicitly
// (e.g. via `node ./dist/index.mjs` once, or a deploy hook) instead of on
// every request-path boot.
import app from "./app";

export default app;
