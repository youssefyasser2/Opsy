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

COPY apps/nest-app apps/nest-app

WORKDIR /workspace/apps/nest-app
RUN pnpm build

# ──────────────────────────────────────────
# Production image
# ──────────────────────────────────────────
FROM node:22-bookworm-slim AS runner

ENV NODE_ENV=production
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable

WORKDIR /workspace

COPY --from=builder /workspace/package.json ./
COPY --from=builder /workspace/pnpm-lock.yaml ./
COPY --from=builder /workspace/pnpm-workspace.yaml ./
COPY --from=builder /workspace/apps/nest-app/package.json apps/nest-app/package.json
COPY --from=builder /workspace/apps/next-app/package.json apps/next-app/package.json
COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/apps/nest-app/dist apps/nest-app/dist
COPY --from=builder /workspace/apps/nest-app/node_modules apps/nest-app/node_modules

WORKDIR /workspace/apps/nest-app

EXPOSE 5000

CMD ["node", "dist/src/main.js"]
