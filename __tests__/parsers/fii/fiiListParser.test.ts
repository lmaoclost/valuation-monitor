import { describe, it, expect } from "vitest";
import { fiiListParser } from "@/parsers/fii/fiiListParser";
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

describe("fiiListParser", () => {
  it("should filter agronegócio FIIs by type", async () => {
    const data: FiiCSVRow[] = [
      createCSVRow({ TICKER: "KNCA11" }),
      createCSVRow({ TICKER: "HGLG11" }),
    ];

    const result = await fiiListParser(data, "agronegócio");

    expect(result).toHaveLength(1);
    expect(result[0].ticker).toBe("KNCA11");
  });

  it("should filter recebíveis de infraestrutura FIIs by type", async () => {
    const data: FiiCSVRow[] = [
      createCSVRow({ TICKER: "KDIF11" }),
      createCSVRow({ TICKER: "HGLG11" }),
    ];

    const result = await fiiListParser(data, "recebíveis de infraestrutura");

    expect(result).toHaveLength(1);
    expect(result[0].ticker).toBe("KDIF11");
  });

  it("should filter fundo de fundos FIIs by type", async () => {
    const data: FiiCSVRow[] = [
      createCSVRow({ TICKER: "BCFF11" }),
      createCSVRow({ TICKER: "HGLG11" }),
    ];

    const result = await fiiListParser(data, "fundo de fundos");

    expect(result).toHaveLength(1);
    expect(result[0].ticker).toBe("BCFF11");
  });

  it("should return empty array when type has no matches", async () => {
    const data: FiiCSVRow[] = [
      createCSVRow({ TICKER: "HGLG11" }),
    ];

    const result = await fiiListParser(data, "agronegócio");

    expect(result).toHaveLength(0);
  });

  it("should output formatted fields with correct types", async () => {
    const data: FiiCSVRow[] = [
      createCSVRow({ TICKER: "KNCA11", PRECO: 95, DY: 0.08 }),
    ];

    const result = await fiiListParser(data, "agronegócio");

    expect(result[0].ticker).toBe("KNCA11");
    expect(result[0].category).toBe("Agronegócio");
    expect(result[0].price).toContain("95");
    expect(result[0].dy).toContain("%");
    expect(result[0].isTopManager).toBe("SIM");
  });
});
