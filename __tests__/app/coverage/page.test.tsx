import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CoveragePage from "@/app/coverage/page";

vi.mock("@/lib/coverage", () => ({
  getCoverageData: vi.fn().mockResolvedValue({
    lastUpdated: "2026-06-16T00:00:00.000Z",
    entries: [
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
    ],
  }),
}));

describe("Coverage Page", () => {
  it("renders title from coverage data", async () => {
    const Page = await CoveragePage();
    render(Page);
    expect(screen.getByText("Cobertura")).toBeInTheDocument();
  });

  it("renders all 4 market cards", async () => {
    const Page = await CoveragePage();
    render(Page);
    expect(screen.getByText("Ações BR")).toBeInTheDocument();
    expect(screen.getByText("Ações USA")).toBeInTheDocument();
    expect(screen.getByText("REITs USA")).toBeInTheDocument();
    expect(screen.getByText("FIIs BR")).toBeInTheDocument();
  });

  it("renders last update line with sources", async () => {
    const Page = await CoveragePage();
    render(Page);
    expect(screen.getByText(/Fontes: Yahoo Finance/)).toBeInTheDocument();
    expect(screen.getByText(/Última atualização:/)).toBeInTheDocument();
  });
});
