#!/usr/bin/env bash
set -euo pipefail

DB_PATH="${DATABASE_URL:-/data/app.sqlite}"
UPLOAD_PATH="${UPLOAD_DIR:-/data/uploads}"
LITESTREAM_CONFIG=/etc/litestream.yml

mkdir -p "$(dirname "$DB_PATH")" "$UPLOAD_PATH"

if [ ! -f "$DB_PATH" ]; then
	echo "No local DB found. Restoring from replica..."
	litestream restore -if-replica-exists -config "$LITESTREAM_CONFIG" -o "$DB_PATH" "$DB_PATH"
fi

if [ -f "$DB_PATH" ]; then
	echo "Verifying DB integrity..."
	if ! sqlite3 "$DB_PATH" 'PRAGMA integrity_check;' | grep -q 'ok'; then
		echo "DB integrity check failed. Re-restoring..."
		rm -f "$DB_PATH"
		litestream restore -if-replica-exists -config "$LITESTREAM_CONFIG" -o "$DB_PATH" "$DB_PATH"
	fi
fi

exec litestream replicate -config "$LITESTREAM_CONFIG" -exec "pnpm --filter @starter/server start"
