# Next.js Fullstack Starter Template

A lightweight, opinionated starter template for building full-stack applications with Next.js and TypeScript. This repository provides a structured foundation and common utilities to accelerate development of production-ready projects (authentication, UI primitives, services, transforms, types, Prisma setup, and GitHub-friendly conventions).

## Key goals

- Fast project bootstrapping for Next.js + TypeScript fullstack apps
- Clear layered architecture separating UI, hooks, services, transforms, and types
- Built-in auth helpers and example integration with NextAuth (headless WordPress can be used as CMS)
- Useful developer utilities and sensible defaults (Tailwind, Prisma, linting)

## Project layout (high level)

- `app/` — Next.js App Router pages, layouts, and global styles
- `components/` — Reusable UI components (atomic/shared UI primitives)
- `hooks/` — Custom React hooks. Hooks manage loading, error and data states and call services
- `lib/` — App utilities, API clients, providers, helpers and service implementations
  - `lib/services/` — Service layer responsible for calling external APIs and returning raw responses
  - `lib/transforms/` — Pure functions to map raw API responses into UI-friendly shapes
  - `lib/helpers/` — Server/client helper functions used across the app
- `entities/` — Small domain-level modules (examples)
- `prisma/` — Prisma schema and migrations
- `public/` — Static assets
- `components.json`, `package.json`, configs — Tooling and meta files

## Conventions

This template follows a layered architecture:

- UI layer: React components and pages. They only call hooks for data and presentation.
- Hook layer: Custom hooks (naming: `use<Entity><Action>.ts`) manage state (loading/error/data), call services, and use transforms to return strongly-typed data to the UI.
- Service layer: (`lib/services/*`) Service classes/functions fetch raw data from external APIs or CMS. Services should avoid heavy mapping.
- Transform layer: (`lib/transforms/*`) Mapping functions that convert raw service responses into UI-friendly types.
- Type layer: (`lib/types/` or `types/`) Centralized TypeScript types and interfaces for reuse.

Follow these conventions when adding features to keep consistency and maintainability.

## Requirements

- Node.js 18+ (recommended) or compatible LTS
- pnpm (recommended) or npm / yarn
- Git

## Quick start

1. Clone the repository (or use this template):

   git clone https://github.com/Vietphu1211/nextjs-fullstack-starter-template.git

2. Install dependencies (using pnpm):

```bash
pnpm install
```

(or with npm):

```bash
npm install
```

3. Copy environment examples and adjust values:

```bash
cp .env.example .env
# Then open .env and update values (DATABASE_URL, NEXTAUTH_URL, etc.)
```

4. Run database migrations (if using Prisma):

```bash
pnpm prisma migrate dev
# or
npx prisma migrate dev
```

5. Start the development server:

```bash
pnpm dev
# or
npm run dev
```

Open http://localhost:3000 to view the app.

## Common scripts

- `dev` — Start Next.js in development mode
- `build` — Build the production version
- `start` — Start the production server (after build)
- `lint` — Run ESLint
- `format` — Run Prettier (if configured)
- `prisma` — Prisma CLI helpers

See `package.json` for the exact script names used in this project.

## Authentication

This template includes example authentication helpers and NextAuth wiring (check the `auth/` folder). It uses a modular provider structure so you can plug in credentials, OAuth providers (Google, Facebook), email, or any custom provider.

## Testing and CI

The repository is ready to add GitHub Actions and CI workflows. Create workflows under `.github/workflows` for linting, tests, builds, and deployment.

## Recommendations / next steps

- Configure real environment secrets (DATABASE_URL, NEXTAUTH_SECRET, SMTP credentials) before deploying.
- Enable branch protection rules and a CI pipeline for PR checks.
- Use an SSH remote or GitHub Personal Access Token for automated pushes in CI.

## Contributing

Contributions are welcome. Follow the repository conventions and keep changes scoped to small, reviewable commits. Add tests for new logic where appropriate.

## License

Add your license information here (e.g., MIT).