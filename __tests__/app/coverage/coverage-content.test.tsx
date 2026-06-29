import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CoverageContent } from "@/app/coverage/coverage-content";
import { CoverageEntry } from "@/lib/coverage";

const entries: CoverageEntry[] = [
  {
    market: "br-stocks",
    tracked: 359,
    universe: 365,
    percentage: 98,
    source: "Yahoo Finance screener (region=br, stock-only, ex-FII/ETF/BDR)",
  },
  {
    market: "usa-stocks",
    tracked: 3985,
    universe: 7051,
    percentage: 57,
    source: "Nasdaq Trader daily files (NYSE, Nasdaq, NYSE American, NYSE Arca, BATS)",
  },
  {
    market: "usa-reits",
    tracked: 57,
    universe: 90,
    percentage: 63,
    source: "Nasdaq Trader + name-based REIT filter (REIT, Real Estate, Realty, Property Trust)",
  },
  {
    market: "br-fiis",
    tracked: 457,
    universe: 524,
    percentage: 87,
    source: "B3 official fund registry API + Yahoo Finance + Fundamentus cross-reference",
  },
];

describe("CoverageContent", () => {
  it("renders language toggle", () => {
    render(<CoverageContent entries={entries} lastUpdated="2026-06-16T00:00:00.000Z" />);
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("renders title and heading", () => {
    render(<CoverageContent entries={entries} lastUpdated="2026-06-16T00:00:00.000Z" />);
    expect(screen.getByText("Cobertura")).toBeInTheDocument();
    expect(screen.getByText("O que rastreamos")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<CoverageContent entries={entries} lastUpdated="2026-06-16T00:00:00.000Z" />);
    expect(
      screen.getByText(/não rastreamos todos os ativos/i),
    ).toBeInTheDocument();
  });

  it("renders all 4 market cards", () => {
    render(<CoverageContent entries={entries} lastUpdated="2026-06-16T00:00:00.000Z" />);
    expect(screen.getByText("Ações BR")).toBeInTheDocument();
    expect(screen.getByText("Ações USA")).toBeInTheDocument();
    expect(screen.getByText("REITs USA")).toBeInTheDocument();
    expect(screen.getByText("FIIs BR")).toBeInTheDocument();
  });

  it("renders methodology section with 4 market paragraphs", () => {
    render(<CoverageContent entries={entries} lastUpdated="2026-06-16T00:00:00.000Z" />);
    expect(screen.getByText("Metodologia")).toBeInTheDocument();
    expect(screen.getByText(/Ações BR:/)).toBeInTheDocument();
    expect(screen.getByText(/Ações USA:/)).toBeInTheDocument();
    expect(screen.getByText(/REITs USA:/)).toBeInTheDocument();
    expect(screen.getByText(/FIIs BR:/)).toBeInTheDocument();
  });

  it("renders last update line with sources", () => {
    render(<CoverageContent entries={entries} lastUpdated="2026-06-16T00:00:00.000Z" />);
    expect(screen.getByText(/Fontes: Yahoo Finance/)).toBeInTheDocument();
    expect(screen.getByText(/Última atualização:/)).toBeInTheDocument();
  });
});
