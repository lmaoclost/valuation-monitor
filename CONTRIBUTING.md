# Contributing

## Local Setup

```bash
git clone <repo>
cd valuation-monitor
bin/setup
```

Edit `.env` with your secrets, then:

```bash
bin/dev        # start dev server on localhost:3000
bin/test       # vitest watch mode
bin/test run   # single run
bin/test e2e   # Playwright e2e
```

## Project Structure

| Directory     | Responsibility |
|---------------|---------------|
| `app/`        | Next.js App Router — pages, API routes, layout |
| `components/` | UI components (shadcn/ui + TanStack Table) |
| `services/`   | Data fetching from external sources |
| `parsers/`    | CSV/HTML data parsing with Zod schemas |
| `lib/`        | Utilities, config, auth, rate limiting |
| `constants/`  | Stock metadata, column visibility, presets |
| `utils/`      | Financial calculations (Bazin, Graham, Gordon, FII) |
| `__tests__/`  | Vitest tests mirroring source structure |

See `docs/architecture.md` for detailed design decisions.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server |
| `npm run build` | Production build + typecheck |
| `npm run lint` | ESLint |
| `npm run test:run` | Vitest single run |
| `npm run test:coverage` | Coverage report |

## Pull Requests

- Keep PRs focused on one concern.
- Run `npm run lint && npm run test:run && npm run build` before opening.
- CI runs the same checks automatically on push.

## Release Process

Maintainers only:

```bash
# bump version, update CHANGELOG, tag, push
git tag v<major>.<minor>.<patch>
git push origin v<major>.<minor>.<patch>
```

CI creates the GitHub Release automatically. Vercel deploys the tagged commit.

## Code Conventions

- **Imports**: `@/*` path alias, no relative imports across packages.
- **Types**: inline when simple, extract to types file when reused.
- **Tests**: one file per module in `__tests__/` mirroring source path.
- **i18n**: all user-facing strings through next-intl messages.
