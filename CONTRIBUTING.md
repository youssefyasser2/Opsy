# Contributing to Opsy

Thank you for your interest in contributing to Opsy! This document outlines the process for contributing code, documentation, and bug reports.

---

## Code of Conduct

Please be respectful and constructive in all interactions. We expect contributors to engage professionally and inclusively.

---

## Reporting Bugs

1. Search [existing issues](../../issues) to avoid duplicates.
2. Open a [bug report](../../issues/new?template=bug_report.yml) with as much detail as possible:
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, browser if applicable)

---

## Requesting Features

1. Check the [roadmap](docs/ROADMAP.md) to see if the feature is already planned.
2. Open a [feature request](../../issues/new?template=feature_request.yml) describing the problem it solves and the proposed solution.

---

## Development Setup

Follow the [Getting Started](README.md#getting-started) section in the README to set up the project locally.

---

## Submitting a Pull Request

1. **Fork** the repository and create your branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes.** Keep commits atomic and descriptive.

3. **Run tests and lint** before pushing:
   ```bash
   pnpm lint
   pnpm test
   ```

4. **Push** your branch and open a pull request against `main`.

5. Fill in the pull request template completely.

---

## Branch Naming

| Type           | Pattern                  | Example                         |
|----------------|--------------------------|---------------------------------|
| Feature        | `feat/<description>`     | `feat/ssh-key-auth`             |
| Bug fix        | `fix/<description>`      | `fix/jwt-expiry-edge-case`      |
| Documentation  | `docs/<description>`     | `docs/improve-contributing`     |
| Refactor       | `refactor/<description>` | `refactor/auth-module-cleanup`  |
| Chore          | `chore/<description>`    | `chore/upgrade-nestjs-v12`      |

---

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add SSH key authentication to remote-agent
fix: resolve JWT refresh edge case on expiry
docs: update environment variable table in README
```

---

## Code Style

- **TypeScript** — strict mode enabled
- **Formatting** — Prettier (configured in `.prettierrc` in the backend)
- **Linting** — ESLint (run `pnpm lint` to check)
- **Testing** — add or update Vitest tests for any changed behavior

---

## Project Structure

See the [Architecture section](README.md#architecture) in the README for a module overview.

---

## Questions?

Open a [discussion](../../discussions) or file an issue with the `question` label.
