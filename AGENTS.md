# Agents

## Stack
- **Next.js 16** (App Router, TypeScript, strict mode)
- **Vitest** for tests (jsdom environment, see `vitest.setup.ts` for global mocks)
- **ESLint** (eslint-config-next/core-web-vitals + typescript)
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **shadcn/ui** style (Zinc base, New York style, Lucide icons)

## Dev Commands
```bash
npm run dev      # next dev (port 3000)
npm run build    # next build
npm run lint     # eslint
npm test         # vitest (watch mode)
npm run test:run # vitest run (CI)
npm run test:coverage # coverage report
```
No separate typecheck command (handled by Next.js build).

## Path Alias
`@/*` maps to project root. All imports use this.

## Testing
- Test files: `__tests__/**/*.test.{ts,tsx}` (not inside component folders)
- Vitest setup auto-mocks: `next/link`, `next/font/google`, `next/cache`, `next/router`, `next/navigation`, `VirtualizedTableBody`
- Global `fetch` is mocked with `vi.fn()` in all tests
- Fixtures: `__tests__/fixtures/`

## Architecture
- `app/` — Next.js App Router (pages, API routes, actions)
- `services/` — Data fetching services (stocks, ERP, IPCA, risk data)
- `parsers/` — CSV/data parsing logic
- `components/` — UI components (uses shadcn/ui + TanStack Table + TanStack Query)
- `lib/` — Utilities (`fetchWithSecret.ts`, `utils.ts`)
- `constants/` — Shared constants
- `__tests__/` — Tests (mirrors source structure)

## API Routes (`app/api/`)
All under `/api/` and proxied via `proxy.ts` which requires:
- `origin` header matching `NEXT_PUBLIC_API_URL`
- `x-app-secret` header matching `PRIVATE_API_SECRET`

## Key Dependencies
- `papaparse` — CSV parsing
- `cheerio` — HTML scraping
- `@tanstack/react-query` + `@tanstack/react-table` + `@tanstack/react-virtual` — Data fetching/display
- `zod` — Schema validation

## Environment Variables
- `CSV_URL` — StatusInvest CSV export URL
- `ERP_URL` — FGV ERP scraping URL
- `IPCA_URL` — IBGE IPCA scraping URL
- `NEXT_PUBLIC_API_URL` — Allowed origin for proxy
- `PRIVATE_API_SECRET` — Proxy auth header (`x-app-secret`)

## Caching Strategy
- Services use Next.js `cacheTag` + `cacheLife` (1 day revalidation)
- Server actions use `React.cache()` for request deduplication per request
- React Query client-side: `staleTime: 24h`, `gcTime: 24h`

## External Data Sources
- **StatusInvest** — CSV export with fundamentalista data
- **FGV** — ERP (Equity Risk Premium) scraping
- **IBGE** — IPCA (inflation index) scraping

## License
This project is licensed under **AGPL-3.0**. See `LICENSE` file for full text.