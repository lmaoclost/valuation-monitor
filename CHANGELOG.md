# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.1.0] — 2026-06-29

### Added

- **Coverage Dashboard** — market coverage statistics page with service, components, i18n, and tests
- **Coverage section** on landing page with updated header
- **7 new BR stock tickers** to metadata
- **@vercel/analytics** and **@vercel/speed-insights** integration
- **Playwright e2e tests** (home, locale, privacy, stock pages)
- **Responsive mobile navigation** with Sheet drawer
- **Multi-select filter presets** with client-side AND logic
- **Individual green discount presets**, FII category/subcategory presets, USA stocks default column visibility
- **Dedicated tests** for shared transforms, parseUSALike, baseFiiDomain, baseFiiFormatter
- **LGPD compliance** — IP anonymization, sanitized logs, privacy notice

### Fixed

- Coverage card labels using i18n instead of hardcoded English
- FII category assertions to match metadata
- USA REIT ticker link
- Responsivity issues
- `calculateFieldColor` boundary bug when value equals thresholds[0]
- `baseFiiFormatter` inline types using `number` instead of `string`
- Hydration mismatch by passing server locale as prop to `I18nClientProvider`
- Locale self-detection to avoid blocking route error
- Privacy language
- Hardcoded links and URLs
- Timeout sizes and overriding timeout values
- Scraper resilience with fallback values on fetch failure
- IPCA scraper switched from IBGE to StatusInvest
- FII preset filter query key mapping
- ESLint config and lint errors

### Changed

- **i18n infrastructure** with next-intl (PT/EN) — all DataTable columns, TableControls, FIITableWrapper, header toggle
- Refactored code quality — FII lazy fetch, memo, parser consolidation, shared transforms
- Trimmed redundant/placeholder tests, kept only useful coverage
- Updated stocks and REITs metadata
- Updated packages and dependencies

### Documentation

- Updated AGENTS.md with USA REIT details
- Updated privacy page date and data sources
- Added i18n PRD to specs

### Tests

- FII API route tests
- Remaining high-value coverage gaps filled
- Coverage page component and integration tests
- Playwright e2e tests
- Dedicated tests for parsers and shared utilities
