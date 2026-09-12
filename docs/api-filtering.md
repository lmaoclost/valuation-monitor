# API Filtering

All table endpoints return the full formatted dataset by default and accept
optional column filters via query string. Filterable columns match the
datatable columns of each page.

## Auth

Every endpoint requires the `x-app-secret` header (same secret as
`PRIVATE_API_SECRET`). Exception: `GET /api/openapi` is public. Interactive
reference: `/docs`.

## Syntax

```
<column>            bare numeric value means gte, bare string means eq
<column>.<op>      explicit operator
sort=<col>:asc|desc
limit=<n>         1-10000
```

Operators: `eq ne contains gte lte gt lt in`.

- `in` takes comma-separated values: `?ticker.in=PETR4,VALE3`.
- `contains` is case-insensitive, string columns only.
- Numeric values accept raw fractions (`0.3`) or percent (`30%`). Plain `30`
  means thirty, not 30%.
- Multiple filters combine with AND.
- Empty cells never match numeric filters.
- Unknown column or invalid value returns `400 { error, allowedColumns }`.
- `sort` on an unknown column returns 400.

## Endpoints

| Path | Content |
| ---- | ------- |
| `/api/fetch-stocks` | BR stocks (Bazin/Graham/Gordon discounts) |
| `/api/fetch-usa-stocks` | USA stocks (USD) |
| `/api/fetch-usa-reit` | USA REITs (USD) |
| `/api/fetch-fii/tijolo` | Tijolo FIIs (`fairPrice`, `ceelingPrice`, `expectativaCrescimento`, ...) |
| `/api/fetch-fii/papel` | Papel FIIs (+`subcategoria`) |
| `/api/fetch-fii/fiagro` | Fiagro list |
| `/api/fetch-fii/fi-infra` | FI-Infra list |
| `/api/fetch-fii/fof` | FoF list |
| `/api/fetch-fii` | Combined `{ tijolo, papel }`, filters apply leniently per array |
| `/api/openapi` | OpenAPI 3.1 spec (public) |

Color helper columns (`*Color`, e.g. `bazinDiscountColor`) are not filterable;
filter the numeric column instead.

## Examples

```bash
# BR stocks with Bazin discount >= 30%
curl -H "x-app-secret: $PRIVATE_API_SECRET" \
  "https://valuation-monitor.vercel.app/api/fetch-stocks?bazinDiscount.gte=0.3"

# Same using percent syntax
curl -H "x-app-secret: $PRIVATE_API_SECRET" \
  "https://valuation-monitor.vercel.app/api/fetch-stocks?bazinDiscount.gte=30%"

# Graham + Gordon combined, sorted, top 50
curl -H "x-app-secret: $PRIVATE_API_SECRET" \
  "https://valuation-monitor.vercel.app/api/fetch-stocks?grahamDiscount.gte=0&gordonDiscount.gte=0&sort=bazinDiscount:desc&limit=50"

# Tijolo FIIs below fair price with DY >= 6%
curl -H "x-app-secret: $PRIVATE_API_SECRET" \
  "https://valuation-monitor.vercel.app/api/fetch-fii/tijolo?fairPrice.gte=150&dy.gte=0.06"
```
