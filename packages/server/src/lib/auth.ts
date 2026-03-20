import { getCookie } from "hono/cookie";
import type { Context } from "hono";
import { createHash, timingSafeEqual } from "node:crypto";

const BEARER_PREFIX = "Bearer ";
const PUBLIC_PATHS = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/me",
  "/api/health",
]);

export { PUBLIC_PATHS };

function secureEqual(
  left: string | null | undefined,
  right: string | null | undefined,
): boolean {
  if (!left || !right) {
    return false;
  }

  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function getSessionCookieName(): string {
  return process.env.SESSION_COOKIE_NAME?.trim() || "app_session";
}

export function isAuthEnabled(): boolean {
  const flag = process.env.API_AUTH_ENABLED?.trim().toLowerCase();
  return flag === "true" || flag === "1";
}

function isQueryParamAuthEnabled(): boolean {
  const flag = process.env.API_AUTH_ALLOW_QUERY_PARAM;
  if (!flag) {
    return false;
  }

  return flag.toLowerCase() === "true" || flag === "1";
}

function getBearerToken(authorization: string | undefined): string | null {
  if (!authorization?.startsWith(BEARER_PREFIX)) {
    return null;
  }

  const token = authorization.slice(BEARER_PREFIX.length).trim();
  return token.length > 0 ? token : null;
}

function getQueryParamToken(c: Context): string | null {
  if (!isQueryParamAuthEnabled()) {
    return null;
  }

  return c.req.query("token") ?? null;
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("base64url");
}

export function getSessionCookieValue(authToken: string): string {
  return hashToken(authToken);
}

export function isValidPassword(
  password: string | undefined,
  authToken: string,
): boolean {
  return secureEqual(password, authToken);
}

export function isAuthenticatedRequest(c: Context, authToken: string): boolean {
  const cookieToken = getCookie(c, getSessionCookieName());
  if (secureEqual(cookieToken, getSessionCookieValue(authToken))) {
    return true;
  }

  const bearerToken = getBearerToken(c.req.header("Authorization"));
  if (secureEqual(bearerToken, authToken)) {
    return true;
  }

  const queryToken = getQueryParamToken(c);
  if (secureEqual(queryToken, authToken)) {
    return true;
  }

  return false;
}

export function sessionCookieName(): string {
  return getSessionCookieName();
}
