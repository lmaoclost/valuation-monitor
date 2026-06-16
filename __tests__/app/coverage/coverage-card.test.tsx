import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CoverageCard } from "@/app/coverage/coverage-card";
import { CoverageEntry } from "@/lib/coverage";

const brEntry: CoverageEntry = {
  market: "br-stocks",
  tracked: 569,
  universe: 569,
  percentage: 100,
};

const usaEntry: CoverageEntry = {
  market: "usa-stocks",
  tracked: 3985,
  universe: 7051,
  percentage: 57,
};

describe("CoverageCard", () => {
  it("renders translated label and description", () => {
    render(<CoverageCard entry={brEntry} index={0} />);
    expect(screen.getByText("Ações BR")).toBeInTheDocument();
    expect(screen.getByText("Empresas listadas na B3 (Novo Mercado, N1, N2, MB, MA, ED)")).toBeInTheDocument();
  });

  it("renders tracked and universe values", () => {
    render(<CoverageCard entry={usaEntry} index={0} />);
    expect(screen.getByText("3.985")).toBeInTheDocument();
    expect(screen.getByText("7.051")).toBeInTheDocument();
  });

  it("renders percentage", () => {
    render(<CoverageCard entry={usaEntry} index={0} />);
    expect(screen.getByText("57%")).toBeInTheDocument();
  });

  it("renders gap row when gap > 0", () => {
    render(<CoverageCard entry={usaEntry} index={0} />);
    expect(screen.getByText("3.066")).toBeInTheDocument();
  });

  it("does not render gap row when gap = 0", () => {
    render(<CoverageCard entry={brEntry} index={0} />);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });
});
