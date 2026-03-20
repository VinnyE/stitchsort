import { setCookie } from "hono/cookie";
import { Hono } from "hono";
import type { Context } from "hono";
import {
  getSessionCookieValue,
  isAuthenticatedRequest,
  isAuthEnabled,
  isValidPassword,
  sessionCookieName,
} from "../lib/auth.js";

const authRoutes = new Hono();

function isSecureRequest(c: Context): boolean {
  const forwardedProto = c.req.header("x-forwarded-proto");
  if (forwardedProto) {
    return forwardedProto.split(",")[0]?.trim() === "https";
  }
  return c.req.url.startsWith("https://");
}

authRoutes.post("/login", async (c) => {
  if (!isAuthEnabled()) {
    return c.json({ error: "Auth is disabled" }, 400);
  }

  const authToken = process.env.API_AUTH_TOKEN;
  if (!authToken) {
    return c.json({ error: "Auth not configured" }, 503);
  }

  const body = await c.req
    .json<{ password?: string } | undefined>()
    .catch(() => undefined);
  if (!isValidPassword(body?.password, authToken)) {
    return c.json({ error: "Invalid password" }, 401);
  }

  setCookie(c, sessionCookieName(), getSessionCookieValue(authToken), {
    httpOnly: true,
    secure: isSecureRequest(c),
    sameSite: "Strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return c.json({ ok: true });
});

authRoutes.post("/logout", (c) => {
  if (!isAuthEnabled()) {
    return c.json({ ok: true, enabled: false });
  }

  setCookie(c, sessionCookieName(), "", {
    httpOnly: true,
    secure: isSecureRequest(c),
    sameSite: "Strict",
    path: "/",
    maxAge: 0,
  });
  return c.json({ ok: true });
});

authRoutes.get("/me", (c) => {
  if (!isAuthEnabled()) {
    return c.json({ enabled: false, authenticated: true });
  }

  const authToken = process.env.API_AUTH_TOKEN;
  if (!authToken) {
    return c.json({ error: "Auth not configured" }, 503);
  }

  return c.json({
    enabled: true,
    authenticated: isAuthenticatedRequest(c, authToken),
  });
});

export { authRoutes };
