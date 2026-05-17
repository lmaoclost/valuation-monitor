import { describe, it, expect } from "vitest";
import { createUSAParser } from "@/parsers/stocks/parseUSALike";

const mockRow = {
  TICKER: "AAPL",
  PRECO: 150,
  DY: 0.025,
  "P/L": 25,
  "P/VP": 5,
  "P/ATIVOS": 3,
  "MARGEM BRUTA": 0.45,
  "MARGEM EBIT": 0.3,
  "MARG. LIQUIDA": 0.2,
  "P/EBIT": 20,
  "EV/EBIT": 22,
  "DIVIDA LIQUIDA / EBIT": 1,
  "DIV. LIQ. / PATRI.": 0.3,
  PSR: 2,
  "P/CAP. GIRO": 4,
  "P. AT CIR. LIQ.": 3,
  "LIQ. CORRENTE": 1.5,
  ROE: 0.25,
  ROA: 0.15,
  ROIC: 0.2,
  "PATRIMONIO / ATIVOS": 0.6,
  "PASSIVOS / ATIVOS": 0.4,
  "GIRO ATIVOS": 1,
  "CAGR RECEITAS 5 ANOS": 0.1,
  "CAGR LUCROS 5 ANOS": 0.12,
  " LIQUIDEZ MEDIA DIARIA": 5000000,
  " VPA": 30,
  " LPA": 7.5,
  " PEG Ratio": 1.5,
  " VALOR DE MERCADO": 3000000000,
};

describe("createUSAParser", () => {
  it("returns a function", () => {
    const parser = createUSAParser();
    expect(typeof parser).toBe("function");
  });

  it("parses a single stock", () => {
    const parser = createUSAParser();
    const result = parser([mockRow], 0.06);
    expect(result).toHaveLength(1);
    expect(result[0].ticker).toBe("AAPL");
  });

  it("parses multiple stocks", () => {
    const parser = createUSAParser();
    const result = parser([mockRow, { ...mockRow, TICKER: "MSFT" }], 0.06);
    expect(result).toHaveLength(2);
    expect(result[0].ticker).toBe("AAPL");
    expect(result[1].ticker).toBe("MSFT");
  });

  it("returns formatted price with USD prefix", () => {
    const parser = createUSAParser();
    const result = parser([mockRow], 0.06);
    expect(result[0].price).toContain("$");
  });

  it("returns empty array for empty input", () => {
    const parser = createUSAParser();
    const result = parser([], 0.06);
    expect(result).toEqual([]);
  });

  it("accepts custom bazinRate", () => {
    const parser = createUSAParser(0.05);
    const result = parser([mockRow], 0.06);
    expect(result).toHaveLength(1);
  });

  it("returns bazinFairPrice in formatted currency", () => {
    const parser = createUSAParser();
    const result = parser([mockRow], 0.06);
    expect(result[0].bazinFairPrice).toContain("$");
  });
});
