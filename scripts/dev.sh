#!/usr/bin/env bash
set -euo pipefail

backend_pid=""
frontend_pid=""

cleanup() {
  for pid in "$backend_pid" "$frontend_pid"; do
    if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
      kill "$pid" 2>/dev/null || true
    fi
  done
}

trap cleanup EXIT INT TERM

echo "Starting Nest backend on http://localhost:5000"
pnpm --dir apps/nest-app start:dev &
backend_pid=$!

echo "Starting Next frontend on http://localhost:3000"
pnpm --dir apps/next-app dev &
frontend_pid=$!

wait -n "$backend_pid" "$frontend_pid"
status=$?

cleanup
wait 2>/dev/null || true

exit "$status"
