# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Hono + React + SQLite pnpm workspace monorepo (`packages/server` + `packages/web`). The sample app is an "Items Dashboard" with CRUD + optional file attachments. No external databases or services required for local dev — SQLite is embedded, uploads go to local disk, auth is off by default.

### Prerequisites

- Node.js 22.x (available via nvm)
- pnpm 10.7.x (available via corepack)

### Environment setup

Copy `.env.example` to `.env` before first run (defaults are sufficient for local dev).

### Commands

See `README.md` for full list. Key commands:

- `pnpm dev` — runs both backend (:3000) and Vite frontend (:5173) concurrently
- `pnpm check` — TypeScript type checking across all packages
- `pnpm test` — runs server-side tests (Node.js test runner via tsx)
- `pnpm build` — builds both packages

### Gotchas

- pnpm may warn about ignored build scripts for `@swc/core`. This is harmless — platform-specific native binaries are installed via optional dependencies and load correctly without the postinstall script.
- The Vite dev server on :5173 proxies `/api` requests to the Hono server on :3000. Both must be running for the app to work in dev mode.
- SQLite database file and `uploads/` directory are created automatically on first server start; no manual migration step needed for dev.
