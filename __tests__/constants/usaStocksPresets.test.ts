import { describe, it, expect } from "vitest";
import { usaStocksPresets } from "@/constants/usaStocksPresets";
import type { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";

describe("usaStocksPresets", () => {
  const createMockStock = (
    overrides: Partial<StocksFormattedDataType> = {},
  ): StocksFormattedDataType => ({
    ticker: "AAPL",
    companyname: "Apple Inc",
    sectorname: "",
    segmentname: "",
    cicle: "NÃO",
    price: "$150.00",
    dy: "2.5%",
    pl: "25.0%",
    lpa: "6.50",
    vpa: "25.00",
    dpa: "3.75",
    risk: "6.0%",
    discount_margin: "15.0%",
    payout: "57.7%",
    growthDividend: "Crescimento",
    roe: "26.0%",
    cagrProfit: "15.0%",
    damodaramGrowth: "5.0%",
    growthAverage: "10.0%",
    growthAverageColor: "text-green-600",
    bazinDiscount: "35.0%",
    bazinDiscountColor: "text-green-600",
    bazinFairPrice: "$250.00",
    bazinCeelingPrice: "$300.00",
    grahamDiscount: "40.0%",
    grahamDiscountColor: "text-green-600",
    grahamFairPrice: "$280.00",
    grahamCeelingPrice: "$336.00",
    gordonDiscount: "30.0%",
    gordonDiscountColor: "text-green-600",
    gordonFairPrice: "$220.00",
    gordonCeelingPrice: "$264.00",
    d1: "$4.13",
    peg: "1.5",
    pegColor: "text-green-600",
    psr: "8.5",
    psrColor: "text-red-600",
    ...overrides,
  });

  describe("Limpar", () => {
    it("should return null (show all stocks)", () => {
      expect(usaStocksPresets["Limpar"]).toBeNull();
    });
  });

  describe("Discounted", () => {
    it("should return true when all indicators are green", () => {
      const stock = createMockStock({
        bazinDiscountColor: "text-green-600",
        grahamDiscountColor: "text-green-600",
        gordonDiscountColor: "text-green-600",
      });
      const filter = usaStocksPresets["Discounted"];
      expect(filter?.(stock)).toBe(true);
    });

    it("should return false when bazin is not green", () => {
      const stock = createMockStock({
        bazinDiscountColor: "text-red-600",
        grahamDiscountColor: "text-green-600",
        gordonDiscountColor: "text-green-600",
      });
      const filter = usaStocksPresets["Discounted"];
      expect(filter?.(stock)).toBe(false);
    });

    it("should return false when graham is not green", () => {
      const stock = createMockStock({
        bazinDiscountColor: "text-green-600",
        grahamDiscountColor: "text-red-600",
        gordonDiscountColor: "text-green-600",
      });
      const filter = usaStocksPresets["Discounted"];
      expect(filter?.(stock)).toBe(false);
    });

    it("should return false when gordon is not green", () => {
      const stock = createMockStock({
        bazinDiscountColor: "text-green-600",
        grahamDiscountColor: "text-green-600",
        gordonDiscountColor: "text-red-600",
      });
      const filter = usaStocksPresets["Discounted"];
      expect(filter?.(stock)).toBe(false);
    });
  });

  describe("Discounted + PEG", () => {
    it("should return true when all discounted plus PEG is green", () => {
      const stock = createMockStock({
        bazinDiscountColor: "text-green-600",
        grahamDiscountColor: "text-green-600",
        gordonDiscountColor: "text-green-600",
        pegColor: "text-green-600",
      });
      const filter = usaStocksPresets["Discounted PEG"];
      expect(filter?.(stock)).toBe(true);
    });

    it("should return false when PEG is not green even if discounted are green", () => {
      const stock = createMockStock({
        bazinDiscountColor: "text-green-600",
        grahamDiscountColor: "text-green-600",
        gordonDiscountColor: "text-green-600",
        pegColor: "text-red-600",
      });
      const filter = usaStocksPresets["Discounted PEG"];
      expect(filter?.(stock)).toBe(false);
    });
  });
});
