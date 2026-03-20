import assert from "node:assert/strict";
import { existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import Database from "better-sqlite3";
import { runMigrations } from "./migrate.js";

test("runMigrations creates the items table", () => {
  const original = process.env.DATABASE_URL;
  const dbPath = join(tmpdir(), `starter-template-${Date.now()}.sqlite`);
  process.env.DATABASE_URL = dbPath;

  try {
    runMigrations();
    const sqlite = new Database(dbPath);
    const row = sqlite
      .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'items'",
      )
      .get() as { name: string } | undefined;
    assert.equal(row?.name, "items");
    sqlite.close();
  } finally {
    if (original === undefined) {
      delete process.env.DATABASE_URL;
    } else {
      process.env.DATABASE_URL = original;
    }

    if (existsSync(dbPath)) {
      rmSync(dbPath);
    }
    if (existsSync(`${dbPath}-shm`)) {
      rmSync(`${dbPath}-shm`);
    }
    if (existsSync(`${dbPath}-wal`)) {
      rmSync(`${dbPath}-wal`);
    }
  }
});
