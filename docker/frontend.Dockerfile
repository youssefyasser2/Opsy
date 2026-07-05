FROM node:22-bookworm-slim AS base

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable

WORKDIR /workspace

# ──────────────────────────────────────────
# Dependency install stage
# ──────────────────────────────────────────
FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/nest-app/package.json apps/nest-app/package.json
COPY apps/next-app/package.json apps/next-app/package.json

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ──────────────────────────────────────────
# Build stage
# ──────────────────────────────────────────
FROM deps AS builder

ARG NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_TELEMETRY_DISABLED=1

COPY apps/next-app apps/next-app

WORKDIR /workspace/apps/next-app
RUN pnpm build

# ──────────────────────────────────────────
# Production image
# ──────────────────────────────────────────
FROM node:22-bookworm-slim AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /workspace/apps/next-app

COPY --from=builder /workspace/apps/next-app/public ./public
COPY --from=builder /workspace/apps/next-app/.next/standalone ./
COPY --from=builder /workspace/apps/next-app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
