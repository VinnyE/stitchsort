import Database from "better-sqlite3";

function getDbPath(): string {
  return process.env.DATABASE_URL ?? "./app.sqlite";
}

export function runMigrations(): void {
  const sqlite = new Database(getDbPath());
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");

  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      notes TEXT,
      file_key TEXT,
      file_name TEXT,
      file_type TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at);
  `);

  sqlite.close();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrations();
}
