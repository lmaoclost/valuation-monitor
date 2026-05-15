import { describe, it, expect } from "vitest";
import { fiiTijoloPresets, fiiPapelPresets } from "@/constants/fiiPresets";

const makeTijoloRow = (isTopManager: string) => ({
  ticker: "HGLG11",
  category: "Logisticos",
  price: "R$ 100,00",
  dy: "6,00%",
  pvp: "1,11",
  riskPremium: "4,00%",
  riskPremiumColor: "text-green-500",
  discountRate: "11,47%",
  growthRate: "4,39%",
  dividendYear1: "R$ 6,00",
  presentValue1: "R$ 5,38",
  dividendYear2: "R$ 6,26",
  presentValue2: "R$ 5,04",
  dividendYear3: "R$ 6,54",
  presentValue3: "R$ 4,72",
  dividendYear4: "R$ 6,82",
  presentValue4: "R$ 4,42",
  dividendYear5: "R$ 7,12",
  presentValue5: "R$ 4,14",
  dividendYear6: "R$ 7,44",
  presentValue6: "R$ 3,88",
  dividendYear7: "R$ 7,76",
  presentValue7: "R$ 3,63",
  dividendYear8: "R$ 8,10",
  presentValue8: "R$ 3,40",
  dividendYear9: "R$ 8,46",
  presentValue9: "R$ 3,19",
  dividendYear10: "R$ 8,83",
  presentValue10: "R$ 2,99",
  desinvestment: "R$ 77,00",
  presentValueDesinvestment: "R$ 26,01",
  fairPrice: "R$ 70,80",
  ceelingPrice: "R$ 64,36",
  expectativaCrescimento: "-29,20%",
  caixa: "5,00%",
  cagrDividendos3Anos: "5,00%",
  cagrDividendos3AnosColor: "text-green-500",
  cagrValorCota3Anos: "3,00%",
  cagrValorCota3AnosColor: "text-green-500",
  gestao: "GESTORA ABC",
  isTopManager,
  patrimonio: "R$ 500.000.000,00",
  qtdImoveis: "10",
  ativos: "MONO",
  locatario: "LOCATARIO ABC",
  cotistas: "5000",
  liquidezDiaria: "R$ 500.000,00",
  precoM2: "R$ 5.000,00",
  aluguelM2: "R$ 50,00",
  capRate: "7,00%",
  vacanciaMedia: "5,00%",
});

describe("fiiTijoloPresets", () => {
  it("should pass all items for Limpar preset", () => {
    const items = [makeTijoloRow("SIM"), makeTijoloRow("NAO")];
    const filterFn = fiiTijoloPresets["Limpar"];
    const result = filterFn ? items.filter(filterFn) : items;
    expect(result).toHaveLength(2);
  });

  it("should filter only top managers for Top Gestores preset", () => {
    const items = [
      makeTijoloRow("SIM"),
      makeTijoloRow("NAO"),
      makeTijoloRow("SIM"),
    ];
    const filterFn = fiiTijoloPresets["Top Gestores"];
    const result = items.filter(filterFn!);
    expect(result).toHaveLength(2);
    result.forEach((item) => expect(item.isTopManager).toBe("SIM"));
  });
});

describe("fiiPapelPresets", () => {
  it("should filter only top managers for Top Gestores preset", () => {
    const filterFn = fiiPapelPresets["Top Gestores"];
    const items = [
      { isTopManager: "SIM", ticker: "KNIP11" },
      { isTopManager: "NAO", ticker: "RBHG11" },
    ] as any;
    const result = items.filter(filterFn!);
    expect(result).toHaveLength(1);
    expect(result[0].ticker).toBe("KNIP11");
  });
});
