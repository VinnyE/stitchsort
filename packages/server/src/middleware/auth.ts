import { createMiddleware } from "hono/factory";
import {
  isAuthenticatedRequest,
  isAuthEnabled,
  PUBLIC_PATHS,
} from "../lib/auth.js";

export const authMiddleware = createMiddleware(async (c, next) => {
  if (c.req.method === "OPTIONS" || PUBLIC_PATHS.has(c.req.path)) {
    return next();
  }

  if (!isAuthEnabled()) {
    return next();
  }

  const authToken = process.env.API_AUTH_TOKEN;
  if (!authToken) {
    return c.json({ error: "Auth not configured" }, 503);
  }

  if (isAuthenticatedRequest(c, authToken)) {
    return next();
  }

  return c.json({ error: "Unauthorized" }, 401);
});
