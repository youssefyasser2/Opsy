<div align="center">
  <img src="apps/next-app/public/logo.svg" alt="Opsy Logo" height="60" />
  <h1>Opsy</h1>
  <p><strong>A self-hosted infrastructure management platform</strong></p>
  <p>Manage your remote servers, deployments, and operations from a single, modern interface.</p>

  <p>
    <a href="https://github.com/youssefyasser/opsy/actions/workflows/ci.yml">
      <img src="https://github.com/youssefyasser/opsy/actions/workflows/ci.yml/badge.svg" alt="CI" />
    </a>
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/license-Proprietary-red.svg" alt="License" />
    </a>
    <img src="https://img.shields.io/badge/node-22%2B-brightgreen" alt="Node 22+" />
    <img src="https://img.shields.io/badge/pnpm-workspace-orange" alt="pnpm workspace" />
    <img src="https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs" alt="NestJS" />
    <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql&logoColor=white" alt="PostgreSQL" />
  </p>
</div>

---

## Overview

Opsy is a full-stack infrastructure management platform that gives you a clean web UI and a robust REST API to manage remote servers, projects, and deployments — all self-hosted, all yours.

Built on a **NestJS** backend and a **Next.js** frontend inside a **pnpm monorepo**, Opsy is designed to scale from a personal homelab to a small operations team.

---

## Features

- 🔐 **Authentication** — Register, login, and password reset with JWT
- 👤 **User management** — Full CRUD with role-based admin access
- 🖥️ **Remote server registry** — Register and manage SSH/SFTP servers with ownership, soft delete, and status tracking
- 📖 **OpenAPI / Swagger** — Interactive API docs at `/swagger`
- 🐘 **PostgreSQL** — TypeORM persistence with migrations-ready entity design
- 📋 **Structured logging** — Per-request HTTP logs (Morgan) + application logs (Winston) with daily rotation
- ✅ **Tested** — Vitest unit and e2e test suites
- 🐳 **Docker-ready** — One-command production stack with Compose

---

## Architecture

```
opsy/
├── apps/
│   ├── nest-app/        # NestJS REST API (port 5000)
│   └── next-app/        # Next.js web frontend (port 3000)
├── docker/              # Dockerfiles + docker-compose.yml
├── docs/                # Project documentation & roadmap
├── scripts/             # Developer helper scripts
└── .github/             # CI/CD workflows + community files
```

The backend follows a feature-module architecture:

```
src/
├── features/
│   ├── auth/            # JWT auth, password reset
│   ├── users/           # User entity, CRUD, guards
│   ├── remote-agent/    # Remote server management
│   ├── project-discovery/
│   └── log-sources/
├── common/              # Guards, decorators, interceptors, pipes
├── config/              # Environment config factories
├── health/              # Health check endpoint
└── main.ts
```

---

## Tech Stack

| Layer       | Technology                              |
|-------------|-----------------------------------------|
| Runtime     | Node.js 22                              |
| API         | NestJS 11, Express                      |
| Frontend    | Next.js 16, React 19, Tailwind CSS 4   |
| Database    | PostgreSQL 16, TypeORM                  |
| Auth        | JWT (`@nestjs/jwt`)                     |
| Validation  | `class-validator`, `class-transformer`  |
| Mailer      | Nodemailer, `@nestjs-modules/mailer`    |
| Logging     | Winston, Morgan                         |
| Testing     | Vitest, Supertest                       |
| Monorepo    | pnpm workspaces                         |
| Container   | Docker, Docker Compose                  |
| CI/CD       | GitHub Actions → GHCR                   |

---

## Getting Started

### Prerequisites

- **Node.js** 22+
- **pnpm** (installed via Corepack)
- **PostgreSQL** 16+

### Installation

```bash
# Enable Corepack to use pnpm
corepack enable

# Install all workspace dependencies
pnpm install
```

### Environment Setup

Copy the example environment file and fill in your values:

```bash
cp apps/nest-app/.env.example apps/nest-app/.env
```

| Variable              | Description                                      | Default             |
|-----------------------|--------------------------------------------------|---------------------|
| `NODE_ENV`            | Runtime environment                              | `development`       |
| `DB_HOST`             | PostgreSQL host                                  | `localhost`         |
| `DB_PORT`             | PostgreSQL port                                  | `5432`              |
| `DB_USER`             | PostgreSQL user                                  | `postgres`          |
| `DB_PASSWORD`         | PostgreSQL password                              | —                   |
| `DB_NAME`             | PostgreSQL database name                         | `postgres`          |
| `JWT_SECRET`          | Secret for signing JWTs (use a long random hex)  | —                   |
| `JWT_EXPIRES_IN`      | Token expiry duration                            | `1d`                |
| `MAILER_HOST`         | SMTP host                                        | `smtp.gmail.com`    |
| `MAILER_PORT`         | SMTP port                                        | `587`               |
| `EMAIL_USER`          | Sender email address                             | —                   |
| `EMAIL_PASS`          | SMTP password or app password                    | —                   |
| `CORS_ORIGIN`         | Allowed CORS origin for the frontend             | `http://localhost:3000` |
| `LOG_LEVEL`           | HTTP log level                                   | `http`              |

The frontend reads one variable:

| Variable                  | Description              | Default                  |
|---------------------------|--------------------------|--------------------------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend base URL         | `http://localhost:5000`  |

---

## Running Locally

Start both apps simultaneously from the repo root:

```bash
pnpm dev
```

Or run them individually:

```bash
pnpm dev:backend    # http://localhost:5000
pnpm dev:frontend   # http://localhost:3000
```

| Service   | URL                              |
|-----------|----------------------------------|
| Frontend  | http://localhost:3000            |
| API       | http://localhost:5000            |
| Swagger   | http://localhost:5000/swagger    |

> **Linux users:** If you see `ENOSPC` errors during hot-reloading, run `pnpm run increase-watch-limit` once to raise the inotify limit.

---

## Running with Docker

A full stack (PostgreSQL + API + frontend) can be started with:

```bash
pnpm docker:up
```

Other useful commands:

```bash
pnpm docker:build   # Rebuild images without starting
pnpm docker:down    # Stop and remove containers
pnpm docker:logs    # Tail container logs
```

Or run Docker Compose directly:

```bash
docker compose -f docker/docker-compose.yml up --build
```

---

## Available Scripts

| Script                    | Description                                     |
|---------------------------|-------------------------------------------------|
| `pnpm dev`                | Start backend + frontend in watch mode          |
| `pnpm dev:backend`        | Start backend only                              |
| `pnpm dev:frontend`       | Start frontend only                             |
| `pnpm build`              | Build both apps for production                  |
| `pnpm start`              | Run production builds of both apps              |
| `pnpm lint`               | Run ESLint on the entire workspace              |
| `pnpm test`               | Run backend unit tests                          |
| `pnpm docker:up`          | Start full Docker stack                         |
| `pnpm docker:down`        | Stop Docker stack                               |
| `pnpm docker:build`       | Build Docker images                             |
| `pnpm docker:logs`        | Tail Docker logs                                |

---

## API Reference

Interactive docs are available at **`http://localhost:5000/swagger`** when the backend is running.

### Endpoints

| Method   | Path                          | Description                   |
|----------|-------------------------------|-------------------------------|
| `GET`    | `/health`                     | Health check                  |
| `POST`   | `/auth/register`              | Register a new user           |
| `POST`   | `/auth/login`                 | Login and receive a JWT       |
| `POST`   | `/auth/forgetpass`            | Trigger password reset email  |
| `GET`    | `/users`                      | List users (admin only)       |
| `POST`   | `/users`                      | Create a user                 |
| `GET`    | `/users/:id`                  | Get user by ID                |
| `GET`    | `/users/email/:email`         | Get user by email             |
| `GET`    | `/users/identifier/:ident`    | Get user by unique identifier |
| `PATCH`  | `/users/:id`                  | Update user                   |
| `DELETE` | `/users/:id`                  | Delete user                   |
| `GET`    | `/remote-servers`             | List remote servers           |
| `POST`   | `/remote-servers`             | Register a remote server      |
| `GET`    | `/remote-servers/:id`         | Get remote server by ID       |
| `PATCH`  | `/remote-servers/:id`         | Update remote server          |
| `DELETE` | `/remote-servers/:id`         | Delete remote server          |

---

## CI / CD

| Workflow | Trigger                    | What it does                                         |
|----------|----------------------------|------------------------------------------------------|
| CI       | Every push + pull request  | Lint, build, and test both apps                      |
| CD       | Push to `main`             | Build and publish Docker images to GHCR              |

Images are published to:
- `ghcr.io/<owner>/opsy-backend`
- `ghcr.io/<owner>/opsy-frontend`

---

## Roadmap

See [docs/ROADMAP.md](docs/ROADMAP.md) for the full feature roadmap including planned phases for remote command execution, live monitoring, Docker management, PM2 integration, deployment automation, and more.

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

---

## Security

If you discover a security vulnerability, please follow the process described in [SECURITY.md](SECURITY.md). Do not open a public issue for security problems.

---

## License

This project is licensed under a proprietary license. See [LICENSE](LICENSE) for details.
