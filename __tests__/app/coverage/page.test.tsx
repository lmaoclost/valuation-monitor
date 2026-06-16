import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CoveragePage from "@/app/coverage/page";

vi.mock("@/lib/coverage", () => ({
  getCoverageData: vi.fn().mockResolvedValue({
    lastUpdated: "2026-06-16T00:00:00.000Z",
    entries: [
      {
        market: "br-stocks",
        label: "BR Stocks",
        description: "B3 Bovespa listings",
        tracked: 569,
        universe: 569,
        percentage: 100,
      },
      {
        market: "usa-stocks",
        label: "USA Stocks",
        description: "NYSE, Nasdaq",
        tracked: 3985,
        universe: 7051,
        percentage: 57,
      },
      {
        market: "usa-reits",
        label: "USA REITs",
        description: "Non-ETF REITs",
        tracked: 57,
        universe: 90,
        percentage: 63,
      },
      {
        market: "br-fiis",
        label: "BR FIIs",
        description: "B3 registry",
        tracked: 457,
        universe: 524,
        percentage: 87,
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
    expect(screen.getByText("BR Stocks")).toBeInTheDocument();
    expect(screen.getByText("USA Stocks")).toBeInTheDocument();
    expect(screen.getByText("USA REITs")).toBeInTheDocument();
    expect(screen.getByText("BR FIIs")).toBeInTheDocument();
  });

  it("renders last update line with sources", async () => {
    const Page = await CoveragePage();
    render(Page);
    expect(screen.getByText(/Fontes: Nasdaq Trader/)).toBeInTheDocument();
    expect(screen.getByText(/Última atualização:/)).toBeInTheDocument();
  });
});
