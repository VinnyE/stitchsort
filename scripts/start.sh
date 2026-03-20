#!/usr/bin/env bash
set -euo pipefail

pnpm migrate
exec pnpm --filter @starter/server start
