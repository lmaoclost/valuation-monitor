# Architecture

## Data Flow

```
External Sources (CSV, Scraping)
  → services/  (fetch + cache via Next.js cacheTag/cacheLife)
  → parsers/   (Zod-schematized parsing)
  → utils/     (financial calculations)
  → components/ + app/  (TanStack Table display)
```

## Layers

### 1. Data Collection (`services/`)

Each external source has a dedicated service:
- `getCSVData.service.ts` — StatusInvest CSV export (BR stocks)
- `getUSACSVData.service.ts` — USA stocks CSV
- `getUSAReitCSVData.service.ts` — USA REITs CSV
- `getERPData.service.ts` — FGV Equity Risk Premium
- `getIPCAData.service.ts` — IPCA index
- `getFiiCSVData.service.ts` — FII CSV data
- `getFiiListData.service.ts` — combined FII list
- `getFundamentusFiiData.service.ts` — FII property/segment data
- `getTesouroIPCA2035.service.ts` — risk-free rate reference

All services use `fetchWithSecret` for API proxying and `next/cache` tags for 1d revalidation.

### 2. Parsing (`parsers/`)

- `shared/transforms.ts` — shared Zod transforms (`toNumber`, `toPercentage`)
- `stocks/` — BR stock parser + `parseUSALike` factory for USA stocks/REITs
- `fii/` — per-segment parsers (tijolo, papel, fiagro, fi-infra, fof) built on `baseFiiDomain` + `baseFiiFormatter`

### 3. Calculations (`utils/`)

Divided by model:
- `calculateBazinFairPrice.ts` — Bazin dividend discount
- `grahamValuation.ts` — Graham formula
- `gordonValuation.ts` — Gordon growth model
- `fii/` — FII-specific: fair price, discount rate, DCF pipeline, boxplot outliers, desinvestment, present value, dividend year, growth expectation
- `financialRatios.ts`, `growthCalculations.ts` — supporting indicators
- `calculateFieldColor.ts`, `calculatePEGColorBranch.ts`, `calculatePSRColor.ts` — color-coded threshold visualization

### 4. Market Configuration (`lib/marketConfig.ts`)

Each market type defines its risk model:
- **BR Stocks**: dynamic risk premium (ERP + IPCA), Bazin rate 6%
- **USA Stocks**: fixed 6% risk premium, Bazin rate 3%, USD
- **USA REITs**: fixed 6% risk premium, Bazin rate 3%, USD, FFO metrics

### 5. Presentation (`components/` + `app/`)

- `app/` — App Router: pages for each market + API routes
- `components/DataTable/` — TanStack Table with virtualized rows, multi-select filter presets, column visibility
- `components/TableWrapper/` — server/client boundary for data fetching
- `components/FIITableWrapper/`, `USATableWrapper/`, `USAReitTableWrapper/` — market-specific table wrappers

## Caching

- **Server**: `cacheTag('stocks', 'fii', 'erp', 'ipca')` + `cacheLife({ revalidate: 86400 })`
- **Client (React Query)**: `staleTime: 24h, gcTime: 24h`
- **Server actions**: `React.cache()` for request deduplication

## Security

- API proxy (`proxy.ts`) validates `origin` header against `NEXT_PUBLIC_API_URL` and `x-app-secret` against `PRIVATE_API_SECRET`
- Rate limiter (`rate-limiter.ts`) protects against abuse
- `auth-validator.ts` centralizes auth checks

## Internationalization

- `next-intl` with PT/EN locales
- Messages in `messages/`
- `I18nClientProvider.tsx` for client components
- All user-facing strings through i18n keys, not hardcoded text
