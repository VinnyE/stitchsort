# Hono + React + SQLite + Fly Template

Thin internal starter for personal web apps that want the same deployment spine proven in a production app:

- pnpm workspace with `packages/server` and `packages/web`
- Hono API serving a built React SPA
- opt-in single-user password auth with cookie and bearer support
- SQLite with boot-time schema creation and WAL mode
- local filesystem uploads with optional Cloudflare R2 / S3-compatible storage
- Docker image for Fly.io
- Litestream restore-on-boot and continuous SQLite replication
- GitHub Actions CI + Fly deploy workflow

The sample app is intentionally small: an "items" dashboard with optional file attachments. It exists to exercise the infrastructure, not to be your product.

## Quick start

1. Copy `.env.example` to `.env`.
2. For a private site, set `API_AUTH_ENABLED=true` and set `API_AUTH_TOKEN`.
3. For a public site, leave `API_AUTH_ENABLED=false`.
4. Install dependencies with `pnpm install`.
5. Run `pnpm dev`.
6. Open `http://localhost:5173`.

## Auth modes

- Public mode: `API_AUTH_ENABLED=false`
- Private mode: `API_AUTH_ENABLED=true` and set `API_AUTH_TOKEN`

The sample frontend adapts automatically and only shows a login screen when auth is enabled.

## First production edits

1. Rename the app in `package.json`.
2. Update `fly.toml`:
   - set `app`
   - keep `DATABASE_URL=/data/app.sqlite`
   - keep `UPLOAD_DIR=/data/uploads`
   - rename the Fly volume source if you want
3. Set Fly secrets:
   - `API_AUTH_ENABLED=true` if the site should be private
   - `API_AUTH_TOKEN` if auth is enabled
   - `LITESTREAM_BUCKET`
   - `LITESTREAM_ENDPOINT`
   - `LITESTREAM_ACCESS_KEY_ID`
   - `LITESTREAM_SECRET_ACCESS_KEY`
   - optional `R2_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`

## Commands

- `pnpm dev` runs server + web locally
- `pnpm build` builds both packages
- `pnpm check` runs TypeScript checks
- `pnpm test` runs server tests
- `pnpm migrate` initializes the SQLite schema
- `pnpm start` starts the built server

## Configuration surface

### Common local settings

- `PORT`: API port, default `3000`
- `DATABASE_URL`: SQLite file path, default `./app.sqlite`
- `UPLOAD_DIR`: local upload directory when R2 is not configured, default `./uploads`
- `API_AUTH_ENABLED`: turns auth on explicitly, default `false`
- `API_AUTH_TOKEN`: single shared password for login and bearer auth when enabled
- `SESSION_COOKIE_NAME`: auth cookie name, default `app_session`
- `API_AUTH_ALLOW_QUERY_PARAM`: optional token query param auth, default `false`

### Optional object storage

- `R2_ENDPOINT`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET`

### Optional Litestream backup target

- `LITESTREAM_BUCKET`
- `LITESTREAM_ENDPOINT`
- `LITESTREAM_ACCESS_KEY_ID`
- `LITESTREAM_SECRET_ACCESS_KEY`
- `LITESTREAM_REPLICA_PATH`

## What is intentionally left project-specific

- your actual schema and product routes
- app naming, branding, copy, and frontend information architecture
- domain-specific background jobs or external API integrations
- Fly regions, sizing, and scaling choices beyond safe defaults
