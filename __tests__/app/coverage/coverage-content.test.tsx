import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CoverageContent } from "@/app/coverage/coverage-content";
import { CoverageEntry } from "@/lib/coverage";

const entries: CoverageEntry[] = [
  {
    market: "br-stocks",
    label: "BR Stocks",
    description: "Standard B3 Bovespa listings",
    tracked: 569,
    universe: 569,
    percentage: 100,
  },
  {
    market: "usa-stocks",
    label: "USA Stocks",
    description: "Common stocks on NYSE, Nasdaq",
    tracked: 3985,
    universe: 7051,
    percentage: 57,
  },
  {
    market: "usa-reits",
    label: "USA REITs",
    description: "Non-ETF REITs on US exchanges",
    tracked: 57,
    universe: 90,
    percentage: 63,
  },
  {
    market: "br-fiis",
    label: "BR FIIs",
    description: "FIIs on B3 registry",
    tracked: 457,
    universe: 524,
    percentage: 87,
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
    expect(screen.getByText("BR Stocks")).toBeInTheDocument();
    expect(screen.getByText("USA Stocks")).toBeInTheDocument();
    expect(screen.getByText("USA REITs")).toBeInTheDocument();
    expect(screen.getByText("BR FIIs")).toBeInTheDocument();
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
    expect(screen.getByText(/Fontes: Nasdaq Trader/)).toBeInTheDocument();
    expect(screen.getByText(/Última atualização:/)).toBeInTheDocument();
  });
});
