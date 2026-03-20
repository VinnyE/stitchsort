import "./env.js";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { runMigrations } from "./db/migrate.js";
import { authMiddleware } from "./middleware/auth.js";
import { authRoutes } from "./routes/auth.js";
import { itemsRoutes } from "./routes/items.js";

runMigrations();

const app = new Hono();

app.use("/api/*", async (c, next) => {
  if (c.req.method === "OPTIONS" || c.req.path === "/api/health") {
    return next();
  }

  const start = performance.now();
  let thrownError: unknown;

  try {
    await next();
  } catch (error) {
    thrownError = error;
    throw error;
  } finally {
    const durationMs = Number((performance.now() - start).toFixed(1));
    const status = c.res?.status ?? (thrownError ? 500 : 0);
    const line = `[api] ${c.req.method} ${c.req.path} status=${status} duration_ms=${durationMs}`;

    if (status >= 500 || durationMs >= 2000) {
      console.warn(line);
    } else {
      console.log(line);
    }
  }
});

app.use("/api/*", cors());
app.use("/api/*", authMiddleware);

app.get("/api/health", (c) => c.json({ ok: true }));
app.route("/api/auth", authRoutes);
app.route("/api/items", itemsRoutes);

const staticRoot = existsSync(resolve(process.cwd(), "../web/dist"))
  ? "../web/dist"
  : "packages/web/dist";
app.use("/assets/*", serveStatic({ root: staticRoot }));
app.use("/favicon.ico", serveStatic({ root: staticRoot }));
app.get("/*", serveStatic({ root: staticRoot, path: "index.html" }));

const port = Number(process.env.PORT ?? 3000);

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`Starter server listening on http://localhost:${info.port}`);
  },
);

export default app;
