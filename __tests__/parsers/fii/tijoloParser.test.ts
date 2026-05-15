import { describe, it, expect } from "vitest";
import { tijoloParser } from "@/parsers/fii/tijoloParser";
import type { FiiCSVRow } from "@/parsers/fii/tijoloSchema";
import type { FundamentusRow } from "@/parsers/fii/fundamentusSchema";

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

const createFundamentusRow = (
  overrides: Partial<FundamentusRow> & { Papel: string; Segmento: string },
): FundamentusRow => ({
  Papel: overrides.Papel,
  Segmento: overrides.Segmento,
  Cotação: 100,
  "FFO Yield": 0.08,
  "Dividend Yield": 0.06,
  "P/VP": 1.1,
  "Valor de Mercado": 500000000,
  Liquidez: 500000,
  "Qtd de imóveis": 10,
  "Preço do m2": 5000,
  "Aluguel por m2": 50,
  "Cap Rate": 0.07,
  "Vacância Média": 0.05,
  ...overrides,
});

describe("tijoloParser", () => {
  it("should process Tijolo-type FIIs and filter out other types", async () => {
    const csvData: FiiCSVRow[] = [
      createCSVRow({ TICKER: "HGLG11" }),
      createCSVRow({ TICKER: "KNIP11" }),
    ];
    const fundamentusData: FundamentusRow[] = [
      createFundamentusRow({ Papel: "HGLG11", Segmento: "Logisticos" }),
      createFundamentusRow({ Papel: "KNIP11", Segmento: "Papel" }),
    ];

    const result = await tijoloParser(csvData, fundamentusData, 0.0747, 0.0439);

    expect(result).toHaveLength(1);
    expect(result[0].ticker).toBe("HGLG11");
  });

  it("should return empty array for non-Tijolo tickers", async () => {
    const csvData: FiiCSVRow[] = [
      createCSVRow({ TICKER: "KNIP11" }),
      createCSVRow({ TICKER: "RBHG11" }),
    ];
    const fundamentusData: FundamentusRow[] = [
      createFundamentusRow({ Papel: "KNIP11", Segmento: "Papel" }),
      createFundamentusRow({ Papel: "RBHG11", Segmento: "Papel" }),
    ];

    const result = await tijoloParser(csvData, fundamentusData, 0.0747, 0.0439);

    expect(result).toHaveLength(0);
  });

  it("should filter out tickers not present in braziLianFIIManager", async () => {
    const csvData: FiiCSVRow[] = [
      createCSVRow({ TICKER: "FAKEN11" }),
    ];
    const fundamentusData: FundamentusRow[] = [
      createFundamentusRow({ Papel: "FAKEN11", Segmento: "Lajes Comerciais" }),
    ];

    const result = await tijoloParser(csvData, fundamentusData, 0.0747, 0.0439);

    expect(result).toHaveLength(0);
  });

  it("should assign risk premium from category in brazilianFIIManager", async () => {
    const csvData: FiiCSVRow[] = [
      createCSVRow({ TICKER: "HGLG11" }),
    ];
    const fundamentusData: FundamentusRow[] = [
      createFundamentusRow({ Papel: "HGLG11", Segmento: "Logisticos" }),
    ];

    const result = await tijoloParser(csvData, fundamentusData, 0.0747, 0.0439);

    expect(result).toHaveLength(1);
    expect(result[0].riskPremium).toBe("4,00%");
    expect(result[0].category).toBe("Logisticos");
  });

  it("should output formatted fields", async () => {
    const csvData: FiiCSVRow[] = [
      createCSVRow({ TICKER: "HGLG11", PRECO: 79.06, DY: 0.0999 }),
    ];
    const fundamentusData: FundamentusRow[] = [
      createFundamentusRow({ Papel: "HGLG11", Segmento: "Logisticos" }),
    ];

    const result = await tijoloParser(csvData, fundamentusData, 0.0747, 0.0439);

    expect(result[0].ticker).toBe("HGLG11");
    expect(result[0].price).toBeTruthy();
    expect(result[0].dy).toBeTruthy();
    expect(result[0].discountRate).toBeTruthy();
    expect(result[0].fairPrice).toBeTruthy();
    expect(result[0].ceelingPrice).toBeTruthy();
  });
});
