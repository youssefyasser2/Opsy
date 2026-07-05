# Opsy — Roadmap

This document tracks planned features and phases for the Opsy platform.

## Currently Implemented

- User authentication (register, login, password reset)
- User management CRUD
- Remote server management CRUD (ownership, soft delete, status tracking, SSH/SFTP types)
- Admin access controls
- Swagger / OpenAPI documentation
- PostgreSQL persistence (TypeORM)
- Structured logging (Winston + Morgan)
- Unit and e2e tests (Vitest)
- Docker Compose setup
- GitHub Actions CI/CD

---

## Phase 1 — Remote Server Connections

- [ ] SSH key authentication
- [ ] Password authentication
- [ ] Test connection endpoint
- [ ] Connection timeout handling
- [ ] Host key verification
- [ ] Encrypt passwords and private keys at rest

---

## Phase 2 — Remote Operations

- [ ] Execute shell commands
- [ ] Command timeout and history
- [ ] File upload / download via SFTP
- [ ] File management (rename, delete, create directories)

---

## Phase 3 — Monitoring

- [ ] Server ping / health check
- [ ] Last connected timestamp
- [ ] CPU, memory, disk, and network usage

---

## Phase 4 — Process Management

- [ ] Restart / shutdown / reboot server
- [ ] `systemctl` service management (start, stop, restart, status)

---

## Phase 5 — Docker Integration

- [ ] List, start, stop, restart, and remove containers
- [ ] Docker Compose operations (up, down, restart, logs)

---

## Phase 6 — PM2 Process Manager

- [ ] List, start, stop, restart, and delete PM2 processes
- [ ] Stream PM2 logs

---

## Phase 7 — Deployment Automation

- [ ] Git clone, pull, and branch checkout
- [ ] Install dependencies, build, restart application
- [ ] Deploy and rollback with history

---

## Phase 8 — Log Streaming

- [ ] Read file-based logs
- [ ] Live log streaming
- [ ] Log filtering and download

---

## Phase 9 — Scheduling

- [ ] Scheduled commands
- [ ] Scheduled deployments
- [ ] Periodic health checks and cleanup jobs

---

## Phase 10 — Notifications

- [ ] Email notifications
- [ ] Telegram, Discord, and Slack integrations

---

## Phase 11 — Security

- [ ] SSH key rotation
- [ ] Audit and access logs
- [ ] Failed login tracking
- [ ] Session expiration policies

---

## Phase 12 — Future Vision

- [ ] Interactive SSH terminal (web-based)
- [ ] Web file explorer
- [ ] SSH tunneling
- [ ] Multi-server parallel command execution
- [ ] Server tags and groups
- [ ] Environment variable management per server
- [ ] Backup management
- [ ] SSL certificate management
- [ ] Nginx configuration management