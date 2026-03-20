import assert from "node:assert/strict";
import test from "node:test";
import { getSessionCookieValue, isValidPassword } from "./auth.js";

test("session cookie value hashes the auth token", () => {
  assert.notEqual(getSessionCookieValue("secret-token"), "secret-token");
});

test("password validation requires an exact match", () => {
  assert.equal(isValidPassword("secret-token", "secret-token"), true);
  assert.equal(isValidPassword("secret-token ", "secret-token"), false);
});
