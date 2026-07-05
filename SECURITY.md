# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest  | ✅        |

---

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability in Opsy, please disclose it responsibly by emailing:

**[youssefyasser248@gmail.com](mailto:youssefyasser248@gmail.com)**

Include in your report:

- A clear description of the vulnerability
- Steps to reproduce or a proof-of-concept
- The potential impact and severity
- Any suggested mitigations

---

## Response Timeline

| Milestone              | Target      |
|------------------------|-------------|
| Acknowledgment         | 48 hours    |
| Initial assessment     | 5 days      |
| Fix + coordinated disclosure | 30 days |

We will keep you informed throughout the process and credit you in the release notes unless you prefer to remain anonymous.

---

## Scope

The following are **in scope** for vulnerability reports:

- Authentication bypass
- Authorization / privilege escalation
- SQL injection or ORM-level injection
- Sensitive data exposure (credentials, tokens, PII)
- Server-side request forgery (SSRF)
- Remote code execution

The following are **out of scope**:

- Denial of service attacks
- Issues in third-party dependencies not directly exploitable in this project
- Missing security headers on a non-production self-hosted instance
- Social engineering attacks

---

## Security Best Practices for Self-Hosting

- Always set a strong, randomly generated `JWT_SECRET` (at least 256-bit)
- Never expose the API port directly to the internet without a reverse proxy
- Rotate database credentials regularly
- Use HTTPS in production (terminate TLS at your reverse proxy)
- Keep your Node.js and PostgreSQL versions up to date
