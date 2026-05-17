import { describe, it, expect } from "vitest";
import { baseFiiDomain } from "@/parsers/fii/baseFiiDomain";
import type { FiiCSVRow } from "@/parsers/fii/tijoloSchema";

const createRow = (overrides: Partial<FiiCSVRow> = {}): FiiCSVRow => ({
  TICKER: "KNIP11",
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

describe("baseFiiDomain", () => {
  it("extracts ticker and category", () => {
    const result = baseFiiDomain(createRow());
    expect(result.ticker).toBe("KNIP11");
    expect(result.category).toBe("Receb\u00edveis Imobili\u00e1rios");
  });

  it("parses price as number", () => {
    const result = baseFiiDomain(createRow({ PRECO: 95.5 }));
    expect(result.price).toBe(95.5);
  });

  it("parses dy as number", () => {
    const result = baseFiiDomain(createRow({ DY: 0.08 }));
    expect(result.dy).toBe(0.08);
  });

  it("parses pvp correctly", () => {
    const result = baseFiiDomain(createRow({ "P/VP": 0.95 }));
    expect(result.pvp).toBe(0.95);
  });

  it("returns empty string for unknown ticker", () => {
    const result = baseFiiDomain(createRow({ TICKER: "UNKN11" }));
    expect(result.category).toBe("");
    expect(result.gestor).toBe("");
    expect(result.isTopManager).toBe(false);
  });

  it("parses numeric fields correctly", () => {
    const row = createRow({
      PRECO: 100,
      DY: 0.06,
      "P/VP": 1.11,
      "PERCENTUAL EM CAIXA": 5,
      "CAGR DIVIDENDOS 3 ANOS": 0.05,
      " CAGR VALOR CORA 3 ANOS": 0.03,
      PATRIMONIO: 500000000,
      "N COTISTAS": 5000,
      "LIQUIDEZ MEDIA DIARIA": 500000,
    });
    const result = baseFiiDomain(row);
    expect(result.price).toBe(100);
    expect(result.dy).toBe(0.06);
    expect(result.pvp).toBe(1.11);
    expect(result.caixa).toBe(5);
    expect(result.cagrDividendos3Anos).toBe(0.05);
    expect(result.cagrValorCota3Anos).toBe(0.03);
    expect(result.patrimonio).toBe(500000000);
    expect(result.cotistas).toBe(5000);
    expect(result.liquidezDiaria).toBe(500000);
  });

  it("assigns manager info when ticker is known", () => {
    const result = baseFiiDomain(createRow({ TICKER: "KNIP11" }));
    expect(result.gestor.length).toBeGreaterThan(0);
    expect(typeof result.isTopManager).toBe("boolean");
  });

  it("passes through gestao field", () => {
    const result = baseFiiDomain(createRow({ GESTAO: "GESTORA XYZ" }));
    expect(result.gestao).toBe("GESTORA XYZ");
  });
});
