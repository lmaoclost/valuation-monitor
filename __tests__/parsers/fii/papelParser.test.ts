import { describe, it, expect } from "vitest";
import { papelParser } from "@/parsers/fii/papelParser";
import type { FiiCSVRow } from "@/parsers/fii/tijoloSchema";

const createCSVRow = (overrides: Partial<FiiCSVRow> & { TICKER: string }): FiiCSVRow => ({
  TICKER: overrides.TICKER,
  PRECO: 100,
  DY: 0.06,
  "VALOR PATRIMONIAL COTA": 90,
  "P/VP": 1.11,
  "LIQUIDEZ MEDIA DIARIA": 500000,
  "PERCENTUAL EM CAIXA": 5,
  "CAGR DIVIDENDOS 3 ANOS": 0.05,
  " CAGR VALOR CORA 3 ANOS": 0.03,
  PATRIMONIO: 500000000,
  "N COTISTAS": 5000,
  GESTAO: "GESTORA ABC",
  ...overrides,
});

describe("papelParser", () => {
  it("should process Papel-type FIIs and filter out other types", async () => {
    const csvData: FiiCSVRow[] = [
      createCSVRow({ TICKER: "KNIP11" }),
      createCSVRow({ TICKER: "HGLG11" }),
    ];

    const result = await papelParser(csvData);

    expect(result).toHaveLength(1);
    expect(result[0].ticker).toBe("KNIP11");
  });

  it("should return empty array for non-Papel tickers", async () => {
    const csvData: FiiCSVRow[] = [
      createCSVRow({ TICKER: "HGLG11" }),
    ];

    const result = await papelParser(csvData);

    expect(result).toHaveLength(0);
  });

  it("should filter out tickers not present in braziLianFIIManager", async () => {
    const csvData: FiiCSVRow[] = [
      createCSVRow({ TICKER: "FAKEN11" }),
    ];

    const result = await papelParser(csvData);

    expect(result).toHaveLength(0);
  });

  it("should output formatted fields for Papel FIIs", async () => {
    const csvData: FiiCSVRow[] = [
      createCSVRow({ TICKER: "KNIP11", PRECO: 95, DY: 0.08 }),
    ];

    const result = await papelParser(csvData);

    expect(result[0].ticker).toBe("KNIP11");
    expect(result[0].price).toContain("95,00");
    expect(result[0].dy).toContain("%");
    expect(result[0].pvp).toBe("1.11");
  });
});
