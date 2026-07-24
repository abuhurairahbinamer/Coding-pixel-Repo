# Assignment 4 — Tooling & Collaboration

This repository demonstrates a professional TypeScript monorepo setup with shared linting, formatting, ignore rules, and collaborative git practices.

## What is included

- Shared ESLint and Prettier configuration for both `TS-project1` and `TS-project2`
- `.gitignore` configured to exclude `node_modules/`, `dist/`, and `.env`
- A committed `.env.example` file with no actual `.env` secrets
- Conventional commits used in the project history
- A deliberate merge conflict resolved cleanly on a feature branch
- A peer-review cycle with at least one substantive comment addressed before merge

## Acceptance criteria satisfied

- `main` branch contains the final, clean repository state
- Linting and formatting pass cleanly across both TypeScript projects
- `.env` is ignored and not committed
- The resolved-conflict pull request builds cleanly and includes a visible review comment that was addressed

## How to verify

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run lint and format checks for both projects:
   ```bash
   npm run lint
   npm run format:check
   ```

3. Confirm `.env` is ignored:
   ```bash
   git status --ignored
   ```

4. Review commit history to verify conventional commits and branch workflow.

## Notes

This repository is intended to show good tooling and collaboration practices for TypeScript projects in a shared workspace.
