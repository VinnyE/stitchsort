FROM node:22-bookworm-slim AS base
RUN corepack enable

FROM base AS build
# hadolint ignore=DL3008,DL3015
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY packages/server/package.json packages/server/package.json
COPY packages/web/package.json packages/web/package.json
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:22-bookworm-slim AS runtime
# hadolint ignore=DL3008,DL3015
RUN apt-get update && apt-get install -y sqlite3 ca-certificates curl && rm -rf /var/lib/apt/lists/*
RUN corepack enable \
    && curl -fsSL https://github.com/benbjohnson/litestream/releases/download/v0.3.13/litestream-v0.3.13-linux-amd64.tar.gz -o /tmp/litestream.tar.gz \
    && tar -xzf /tmp/litestream.tar.gz -C /usr/local/bin \
    && rm /tmp/litestream.tar.gz \
    && groupadd --system app \
    && useradd --system --gid app --create-home --home-dir /home/app app

WORKDIR /app

COPY --from=build /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=build /app/packages/server/package.json packages/server/package.json
COPY --from=build /app/packages/web/package.json packages/web/package.json
RUN pnpm install --frozen-lockfile --prod

COPY --from=build /app/packages/server/dist packages/server/dist
COPY --from=build /app/packages/web/dist packages/web/dist
COPY deploy/entrypoint.sh /app/deploy/entrypoint.sh
COPY deploy/litestream.yml /etc/litestream.yml

RUN chmod +x /app/deploy/entrypoint.sh && chown -R app:app /app

ENV NODE_ENV=production
EXPOSE 3000
HEALTHCHECK CMD curl -fsS http://127.0.0.1:${PORT:-3000}/api/health || exit 1
USER app

CMD ["/app/deploy/entrypoint.sh"]
