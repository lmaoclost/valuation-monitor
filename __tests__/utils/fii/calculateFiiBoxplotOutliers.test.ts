import { describe, it, expect, beforeEach } from "vitest";
import { calculateFiiBoxplotOutliers } from "@/utils/calculateFiiBoxplotOutliers";
import type { FiiTijoloCalculatedDataType } from "@/@types/FiiTijoloCalculatedDataType";

const makeFund = (
  overrides: Partial<FiiTijoloCalculatedDataType> & {
    ticker: string;
    ativos: string;
    expectativaCrescimento: number;
  },
): FiiTijoloCalculatedDataType => ({
  ticker: overrides.ticker,
  category: "Lajes Comerciais",
  price: 100,
  dy: 0.05,
  pvp: 1.0,
  riskPremium: 0.04,
  discountRate: 0.1147,
  growthRate: 0.0439,
  dividendYear1: 5,
  presentValue1: 4.5,
  dividendYear2: 5.2,
  presentValue2: 4.2,
  dividendYear3: 5.4,
  presentValue3: 3.9,
  dividendYear4: 5.6,
  presentValue4: 3.7,
  dividendYear5: 5.8,
  presentValue5: 3.5,
  dividendYear6: 6.0,
  presentValue6: 3.3,
  dividendYear7: 6.2,
  presentValue7: 3.1,
  dividendYear8: 6.4,
  presentValue8: 2.9,
  dividendYear9: 6.6,
  presentValue9: 2.7,
  dividendYear10: 6.8,
  presentValue10: 2.5,
  desinvestment: 59.3,
  presentValueDesinvestment: 20.0,
  fairPrice: 54.3,
  ceelingPrice: 49.4,
  expectativaCrescimento: overrides.expectativaCrescimento,
  caixa: 0.05,
  cagrDividendos3Anos: 0.05,
  cagrValorCota3Anos: 0.03,
  gestao: "GESTORA ABC",
  isTopManager: true,
  patrimonio: 500000000,
  qtdImoveis: 10,
  ativos: overrides.ativos,
  locatario: "LOCATARIO ABC",
  cotistas: 5000,
  liquidezDiaria: 100000,
  precoM2: 5000,
  aluguelM2: 50,
  capRate: 0.07,
  vacanciaMedia: 0.05,
});

const isTopManager = (ticker: string) => ticker.startsWith("TOP");
const basePremium = () => 0.04;

describe("calculateFiiBoxplotOutliers", () => {
  describe("when fewer than 4 top managers in segment", () => {
    it("should not set any premium (returns empty map for non-top-managers)", () => {
      const funds = [
        makeFund({ ticker: "HGLG11", ativos: "MONO", expectativaCrescimento: 0.2 }),
        makeFund({ ticker: "TOP1", ativos: "MONO", expectativaCrescimento: 0.3 }),
      ];

      const result = calculateFiiBoxplotOutliers(funds, isTopManager, 0.0747, basePremium);

      expect(result.size).toBe(0);
    });
  });

  describe("when 4+ top managers in segment", () => {
    it("should keep base premium for non-outlier funds", () => {
      const funds = [
        makeFund({ ticker: "TOP1", ativos: "MONO", expectativaCrescimento: 0.1 }),
        makeFund({ ticker: "TOP2", ativos: "MONO", expectativaCrescimento: 0.11 }),
        makeFund({ ticker: "TOP3", ativos: "MONO", expectativaCrescimento: 0.12 }),
        makeFund({ ticker: "TOP4", ativos: "MONO", expectativaCrescimento: 0.13 }),
        makeFund({ ticker: "HGLG11", ativos: "MONO", expectativaCrescimento: 0.14 }),
      ];

      const result = calculateFiiBoxplotOutliers(funds, isTopManager, 0.0747, basePremium);

      expect(result.size).toBe(5);
      expect(result.get("HGLG11")).toBe(0.04);
    });

    it("should increase premium for outlier funds", () => {
      const funds = [
        makeFund({ ticker: "TOP1", ativos: "MONO", expectativaCrescimento: 0.1 }),
        makeFund({ ticker: "TOP2", ativos: "MONO", expectativaCrescimento: 0.11 }),
        makeFund({ ticker: "TOP3", ativos: "MONO", expectativaCrescimento: 0.12 }),
        makeFund({ ticker: "TOP4", ativos: "MONO", expectativaCrescimento: 0.13 }),
        makeFund({ ticker: "HGLG11", ativos: "MONO", expectativaCrescimento: 0.5 }),
      ];

      const result = calculateFiiBoxplotOutliers(funds, isTopManager, 0.0747, basePremium);

      expect(result.size).toBe(5);
      const premium = result.get("HGLG11")!;
      expect(premium).toBeGreaterThan(0.04);
    });
  });

  it("should use getBasePremium callback for each fund", () => {
    const getPremium = (ticker: string) => (ticker === "BLCA11" ? 0.04 : 0.03);
    const funds = [
      makeFund({ ticker: "TOP1", ativos: "MONO", expectativaCrescimento: 0.1 }),
      makeFund({ ticker: "TOP2", ativos: "MONO", expectativaCrescimento: 0.11 }),
      makeFund({ ticker: "TOP3", ativos: "MONO", expectativaCrescimento: 0.12 }),
      makeFund({ ticker: "TOP4", ativos: "MONO", expectativaCrescimento: 0.13 }),
      makeFund({ ticker: "BLCA11", ativos: "MONO", expectativaCrescimento: 0.14 }),
    ];

    const result = calculateFiiBoxplotOutliers(funds, isTopManager, 0.0747, getPremium);

    expect(result.get("BLCA11")).toBe(0.04);
    expect(result.get("TOP1")).toBe(0.03);
  });
});
