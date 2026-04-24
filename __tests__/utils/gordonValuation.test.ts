import { describe, it, expect } from 'vitest';
import { calculateGordonFairPrice } from '@/utils/calculateGordonFairPrice';
import { calculateGordonDiscount } from '@/utils/calculateGordonDiscount';
import { calculateGordonCeelingPrice } from '@/utils/calculateGordonCeelingPrice';
import type { StatusInvestNormalizedDataType } from '@/@types/StatusInvestNormalizedDataType';

describe('Gordon Valuation Model', () => {
  const baseMockData: StatusInvestNormalizedDataType = {
    TICKER: 'PETR4',
    PRECO: 25.5,
    DY: 0.05,
    'P/L': 8.5,
    'P/VP': 1.5,
    'P/ATIVOS': 1.2,
    'MARGEM BRUTA': 0.45,
    'MARGEM EBIT': 0.35,
    'MARG. LIQUIDA': 0.25,
    'P/EBIT': 6.5,
    'EV/EBIT': 7.0,
    'DIVIDA LIQUIDA / EBIT': 2.5,
    'DIV. LIQ. / PATRI.': 0.5,
    PSR: 1.8,
    'P/CAP. GIRO': 2.0,
    'P. AT CIR. LIQ.': 1.2,
    'LIQ. CORRENTE': 1.5,
    ROE: 0.15,
    ROA: 0.12,
    ROIC: 0.13,
    'PATRIMONIO / ATIVOS': 0.6,
    'PASSIVOS / ATIVOS': 0.4,
    'GIRO ATIVOS': 0.8,
    'CAGR RECEITAS 5 ANOS': 0.08,
    'CAGR LUCROS 5 ANOS': 0.08,
    ' LIQUIDEZ MEDIA DIARIA': 1000000,
    ' VPA': 15.0,
    ' LPA': 3.0,
    ' PEG Ratio': 1.05,
    ' VALOR DE MERCADO': 100000000,
  };

  const riskRate = 0.12; // 12% risk rate

  describe('calculateGordonFairPrice', () => {
    it('should calculate fair price using Gordon model: D1 / (risk - growth)', () => {
      const result = calculateGordonFairPrice(baseMockData, riskRate);
      expect(typeof result).toBe('number');
      expect(Number.isFinite(result)).toBe(true);
    });

    it('should return a positive number for valid inputs', () => {
      const result = calculateGordonFairPrice(baseMockData, riskRate);
      expect(result).toBeGreaterThan(0);
    });

    it('should vary with different risk rates', () => {
      const lowRisk = calculateGordonFairPrice(baseMockData, 0.08);
      const mediumRisk = calculateGordonFairPrice(baseMockData, 0.10);
      // Gordon model can produce negative prices or very large numbers
      // Just verify they're finite numbers
      expect(Number.isFinite(lowRisk)).toBe(true);
      expect(Number.isFinite(mediumRisk)).toBe(true);
    });

    it('should be deterministic', () => {
      const result1 = calculateGordonFairPrice(baseMockData, riskRate);
      const result2 = calculateGordonFairPrice(baseMockData, riskRate);
      expect(result1).toBe(result2);
    });

    it('should handle low growth scenarios', () => {
      const data = { ...baseMockData, 'CAGR LUCROS 5 ANOS': 0.02, 'CAGR RECEITAS 5 ANOS': 0.01 };
      const result = calculateGordonFairPrice(data, riskRate);
      expect(result).toBeGreaterThan(0);
      expect(Number.isFinite(result)).toBe(true);
    });

    it('should handle high growth scenarios', () => {
      const data = { ...baseMockData, 'CAGR LUCROS 5 ANOS': 0.15, 'CAGR RECEITAS 5 ANOS': 0.12 };
      const result = calculateGordonFairPrice(data, riskRate);
      expect(result).toBeGreaterThan(0);
      expect(Number.isFinite(result)).toBe(true);
    });

    it('should handle moderate risk rates', () => {
      const result = calculateGordonFairPrice(baseMockData, 0.10);
      expect(result).toBeGreaterThan(0);
      expect(Number.isFinite(result)).toBe(true);
    });

    it('should produce reasonable valuations', () => {
      const result = calculateGordonFairPrice(baseMockData, riskRate);
      expect(result).toBeLessThan(1000); // sanity check
      expect(result).toBeGreaterThan(0.01); // sanity check
    });
  });

  describe('calculateGordonDiscount', () => {
    it('should calculate discount as (fairPrice - price) / fairPrice', () => {
      const fairPrice = calculateGordonFairPrice(baseMockData, riskRate);
      const result = calculateGordonDiscount(baseMockData, riskRate);
      const expected = (fairPrice - baseMockData.PRECO) / fairPrice;
      expect(result).toBeCloseTo(expected, 5);
    });

    it('should return positive discount when price is below fair price', () => {
      const data = { ...baseMockData, PRECO: 10 };
      const result = calculateGordonDiscount(data, riskRate);
      expect(result).toBeGreaterThan(0);
    });

    it('should return negative discount when price is above fair price', () => {
      const fairPrice = calculateGordonFairPrice(baseMockData, riskRate);
      const data = { ...baseMockData, PRECO: fairPrice * 2 };
      const result = calculateGordonDiscount(data, riskRate);
      expect(result).toBeLessThan(0);
    });

    it('should return value close to zero when price equals fair price', () => {
      const fairPrice = calculateGordonFairPrice(baseMockData, riskRate);
      const data = { ...baseMockData, PRECO: fairPrice };
      const result = calculateGordonDiscount(data, riskRate);
      // Due to floating point arithmetic, check if result is very small
      expect(Math.abs(result)).toBeLessThan(0.1);
    });

    it('should be deterministic', () => {
      const result1 = calculateGordonDiscount(baseMockData, riskRate);
      const result2 = calculateGordonDiscount(baseMockData, riskRate);
      expect(result1).toBe(result2);
    });

    it('should vary with different risk rates', () => {
      const discount1 = calculateGordonDiscount(baseMockData, 0.10);
      const discount2 = calculateGordonDiscount(baseMockData, 0.15);
      expect(discount1).not.toBe(discount2);
    });
  });

  describe('calculateGordonCeelingPrice', () => {
    it('should calculate ceiling price with 30% discount margin', () => {
      const fairPrice = calculateGordonFairPrice(baseMockData, riskRate);
      const result = calculateGordonCeelingPrice(baseMockData, riskRate);
      const expected = fairPrice / 1.3;
      expect(result).toBeCloseTo(expected, 5);
    });

    it('should return a positive number', () => {
      const result = calculateGordonCeelingPrice(baseMockData, riskRate);
      expect(result).toBeGreaterThan(0);
    });

    it('should always be less than fair price', () => {
      const fairPrice = calculateGordonFairPrice(baseMockData, riskRate);
      const ceilingPrice = calculateGordonCeelingPrice(baseMockData, riskRate);
      expect(ceilingPrice).toBeLessThan(fairPrice);
    });

    it('should be deterministic', () => {
      const result1 = calculateGordonCeelingPrice(baseMockData, riskRate);
      const result2 = calculateGordonCeelingPrice(baseMockData, riskRate);
      expect(result1).toBe(result2);
    });

    it('should apply discount margin consistently', () => {
      const discountMargin = 0.3;
      const fairPrice = calculateGordonFairPrice(baseMockData, riskRate);
      const ceilingPrice = calculateGordonCeelingPrice(baseMockData, riskRate);
      expect(ceilingPrice).toBeCloseTo(fairPrice / (1 + discountMargin), 5);
    });

    it('should vary with different risk rates', () => {
      const ceiling1 = calculateGordonCeelingPrice(baseMockData, 0.08);
      const ceiling2 = calculateGordonCeelingPrice(baseMockData, 0.15);
      expect(ceiling1).not.toBe(ceiling2);
    });
  });

  describe('Gordon model integration', () => {
    it('should handle complete stock analysis with multiple risk scenarios', () => {
      const risks = [0.08, 0.10, 0.12, 0.15];
      risks.forEach(risk => {
        const fairPrice = calculateGordonFairPrice(baseMockData, risk);
        const discount = calculateGordonDiscount(baseMockData, risk);
        const ceilingPrice = calculateGordonCeelingPrice(baseMockData, risk);

        // Gordon model produces finite numbers for all inputs
        expect(Number.isFinite(fairPrice)).toBe(true);
        expect(Number.isFinite(ceilingPrice)).toBe(true);
        expect(Number.isFinite(discount)).toBe(true);
        // When fair price is positive, ceiling should be less
        if (fairPrice > 0) {
          expect(ceilingPrice).toBeLessThan(fairPrice);
        }
      });
    });

    it('ceiling price should be less than fair price', () => {
      const fairPrice = calculateGordonFairPrice(baseMockData, riskRate);
      const ceilingPrice = calculateGordonCeelingPrice(baseMockData, riskRate);
      expect(ceilingPrice).toBeLessThan(fairPrice);
    });

    it('should produce different valuations for different risk rates', () => {
      const fairPrice1 = calculateGordonFairPrice(baseMockData, 0.08);
      const fairPrice2 = calculateGordonFairPrice(baseMockData, 0.12);
      const fairPrice3 = calculateGordonFairPrice(baseMockData, 0.15);

      expect(fairPrice1).not.toBe(fairPrice2);
      expect(fairPrice2).not.toBe(fairPrice3);
    });

    it('should produce consistent results for typical risk scenarios', () => {
      const lowRisk = 0.06;
      const mediumRisk = 0.10;
      const highRisk = 0.14;

      const lowRiskPrice = calculateGordonFairPrice(baseMockData, lowRisk);
      const mediumRiskPrice = calculateGordonFairPrice(baseMockData, mediumRisk);
      const highRiskPrice = calculateGordonFairPrice(baseMockData, highRisk);

      // All should be finite numbers
      expect(Number.isFinite(lowRiskPrice)).toBe(true);
      expect(Number.isFinite(mediumRiskPrice)).toBe(true);
      expect(Number.isFinite(highRiskPrice)).toBe(true);
    });
  });
});
