# Valuation Monitor

[![CI](https://github.com/lmaoclost/valuation-monitor/actions/workflows/ci.yml/badge.svg)](https://github.com/lmaoclost/valuation-monitor/actions/workflows/ci.yml)

**Radar fundamentalista para value investing.** Filtre ações BR, USA, FIIs e REITs usando indicadores clássicos de valuation.

A ferramenta não recomenda compra ou venda — ela ajuda a decidir **quais ativos merecem análise mais profunda**.

## Quick Start

```bash
npm install
npm run dev        # localhost:3000
```

Ou use os scripts padronizados:

```bash
bin/setup          # copia .env + npm install
bin/dev            # dev server
bin/test run       # testes
```

> Variáveis de ambiente necessárias em produção na Vercel: ver `.env.example`.

## Indicadores

- **Bazin** — preço justo por dividendos históricos
- **Graham** — preço justo por LPA + VPA
- **Gordon (DDM)** — valor presente de dividendos futuros
- **FII DCF** — fluxo de caixa descontado para tijolo, papel, fiagro, fi-infra, fof

## Mercados

| Mercado | Prêmio de Risco | Bazin | Moeda |
|---------|----------------|-------|-------|
| BR Stocks | ERP + IPCA (dinâmico) | 6% | BRL |
| USA Stocks | 6% (fixo) | 3% | USD |
| USA REITs | 6% (fixo) | 3% | USD |

## O Que Este Projeto NÃO Faz

- Não recomenda compra/venda
- Não substitui análise gráfica
- Não avalia riscos individuais
- Não garante rentabilidade

## Stack

Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui, TanStack Table/Query/Virtual, Zod, next-intl, Vitest, Playwright.

## Estrutura

```
services/   → coleta de dados externos
parsers/    → parsing CSV/HTML com Zod
utils/      → cálculos financeiros
components/ → UI (TanStack Table + shadcn/ui)
app/        → páginas e API routes (App Router)
```

Ver `docs/architecture.md` para detalhes.

## Licença

AGPL-3.0. Copyright (C) 2026 Renan Oliveira.
