import { describe, it, expect } from "vitest";
import { baseFiiFormatter } from "@/parsers/fii/baseFiiFormatter";

const mockRow = {
  ticker: "KNIP11",
  category: "Papel",
  price: 100,
  dy: 0.06,
  pvp: 1.11,
  caixa: 5,
  cagrDividendos3Anos: 0.05,
  cagrValorCota3Anos: 0.03,
  patrimonio: 500000000,
  gestor: "Kinea",
  isTopManager: true,
  gestao: "GESTORA ABC",
  cotistas: 5000,
  liquidezDiaria: 500000,
};

describe("baseFiiFormatter", () => {
  it("formats price with Brazilian currency format", () => {
    const result = baseFiiFormatter(mockRow);
    expect(result.price).toContain("R$");
    expect(result.price).toContain("100");
  });

  it("formats dy with percentage", () => {
    const result = baseFiiFormatter(mockRow);
    expect(result.dy).toContain("%");
  });

  it("formats pvp as fixed decimal", () => {
    const result = baseFiiFormatter(mockRow);
    expect(result.pvp).toBe("1.11");
  });

  it("converts caixa to percentage", () => {
    const result = baseFiiFormatter(mockRow);
    expect(result.caixa).toContain("%");
  });

  it("formats cagrDividendos3Anos as percentage", () => {
    const result = baseFiiFormatter(mockRow);
    expect(result.cagrDividendos3Anos).toContain("%");
  });

  it("formats cagrValorCota3Anos as percentage", () => {
    const result = baseFiiFormatter(mockRow);
    expect(result.cagrValorCota3Anos).toContain("%");
  });

  it("formats patrimonio as currency", () => {
    const result = baseFiiFormatter(mockRow);
    expect(result.patrimonio).toContain("R$");
  });

  it("formats isTopManager as SIM", () => {
    const result = baseFiiFormatter({ ...mockRow, isTopManager: true });
    expect(result.isTopManager).toBe("SIM");
  });

  it("formats isTopManager as NAO", () => {
    const result = baseFiiFormatter({ ...mockRow, isTopManager: false });
    expect(result.isTopManager).toBe("NAO");
  });

  it("converts cotistas to string", () => {
    const result = baseFiiFormatter(mockRow);
    expect(typeof result.cotistas).toBe("string");
    expect(result.cotistas).toBe("5000");
  });

  it("formats liquidezDiaria as currency", () => {
    const result = baseFiiFormatter(mockRow);
    expect(result.liquidezDiaria).toContain("R$");
  });

  it("passes through text fields", () => {
    const result = baseFiiFormatter(mockRow);
    expect(result.ticker).toBe("KNIP11");
    expect(result.category).toBe("Papel");
    expect(result.gestor).toBe("Kinea");
    expect(result.gestao).toBe("GESTORA ABC");
  });

  it("handles zero dy", () => {
    const result = baseFiiFormatter({ ...mockRow, dy: 0 });
    expect(result.dy).toContain("%");
  });

  it("applies cagrDividendos3Anos color calculation", () => {
    const result = baseFiiFormatter(mockRow);
    expect(typeof result.cagrDividendos3AnosColor).toBe("string");
  });

  it("applies cagrValorCota3Anos color calculation", () => {
    const result = baseFiiFormatter(mockRow);
    expect(typeof result.cagrValorCota3AnosColor).toBe("string");
  });
});
