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
  - `app/stocks/` — Stock analysis pages (shared layout)
    - `br/` — BR stocks
    - `usa/` — USA stocks
    - `br-fii/` — BR FIIs (WIP)
    - `usa-reit/` — USA REITs
- `services/` — Data fetching services (stocks, ERP, IPCA, risk data)
- `parsers/` — CSV/data parsing logic
  - `shared/transforms.ts` — Shared Zod `toNumber`/`toPercentage` transforms
  - `stocks/` — Stock parsing (BR + USA formatters, `parseUSALike` factory for USA)
  - `fii/` — FII parsing (tijolo, papel, fiagro, fi-infra, fof) with `baseFiiDomain`/`baseFiiFormatter` shared bases
- `components/` — UI components (uses shadcn/ui + TanStack Table + TanStack Query)
- `lib/` — Utilities (`fetchWithSecret.ts`, `utils.ts`, `marketConfig.ts`)
- `constants/` — Shared constants (stockMeta, stockUSAMeta, presets)
- `__tests__/` — Tests (mirrors source structure)

## Market Abstraction
The system supports multiple markets via configuration in `lib/marketConfig.ts`:
- **BR Stocks** — Dynamic risk premium (ERP + IPCA), Bazin rate 6%
- **USA Stocks** — Fixed risk premium 6%, Bazin rate 3%, USD currency
- **USA REITs** — Fixed risk premium 6%, Bazin rate 3%, USD currency, FFO metrics

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
- `CSV_URL` — StatusInvest BR CSV export URL
- `CSV_USA_STOCKS_URL` — StatusInvest USA CSV export URL
- `CSV_USA_REIT_URL` — StatusInvest USA REIT CSV export URL
- `ERP_URL` — FGV ERP scraping URL
- `IPCA_URL` — IBGE IPCA scraping URL
- `NEXT_PUBLIC_API_URL` — Allowed origin for proxy
- `PRIVATE_API_SECRET` — Proxy auth header (`x-app-secret`)

## Caching Strategy
- Services use Next.js `cacheTag` + `cacheLife` (1 day revalidation)
- Server actions use `React.cache()` for request deduplication per request
- React Query client-side: `staleTime: 24h`, `gcTime: 24h`

## External Data Sources
- **StatusInvest** — CSV export with fundamentalista data (BR, USA, FIIs), Tesouro IPCA+ rate, IPCA index
- **Fundamentus** — FII segment and property data (tijolo)
- **FGV** — ERP (Equity Risk Premium) scraping

## License
This project is licensed under **AGPL-3.0**. See `LICENSE` file for full text.