import { describe, it, expect } from 'vitest';
import { calculateGrahamFairPrice } from '@/utils/calculateGrahamFairPrice';
import { calculateGrahamDiscount } from '@/utils/calculateGrahamDiscount';
import { calculateGrahamCeelingPrice } from '@/utils/calculateGrahamCeelingPrice';
import type { StatusInvestNormalizedDataType } from '@/@types/StatusInvestNormalizedDataType';

describe('Graham Valuation Model', () => {
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

  describe('calculateGrahamFairPrice', () => {
    it('should calculate fair price using Graham formula: sqrt(22.5 * LPA * VPA)', () => {
      const result = calculateGrahamFairPrice(baseMockData);
      const expected = Math.sqrt(22.5 * 3.0 * 15.0);
      expect(result).toBe(expected);
    });

    it('should return a positive number', () => {
      const result = calculateGrahamFairPrice(baseMockData);
      expect(result).toBeGreaterThan(0);
    });

    it('should be deterministic', () => {
      const result1 = calculateGrahamFairPrice(baseMockData);
      const result2 = calculateGrahamFairPrice(baseMockData);
      expect(result1).toBe(result2);
    });

    it('should handle zero LPA', () => {
      const data = { ...baseMockData, ' LPA': 0 };
      const result = calculateGrahamFairPrice(data);
      expect(result).toBe(0);
    });

    it('should handle zero VPA', () => {
      const data = { ...baseMockData, ' VPA': 0 };
      const result = calculateGrahamFairPrice(data);
      expect(result).toBe(0);
    });

    it('should handle high LPA and VPA values', () => {
      const data = { ...baseMockData, ' LPA': 100, ' VPA': 500 };
      const result = calculateGrahamFairPrice(data);
      expect(result).toBeGreaterThan(0);
      expect(Number.isFinite(result)).toBe(true);
    });

    it('should handle very small LPA and VPA values', () => {
      const data = { ...baseMockData, ' LPA': 0.01, ' VPA': 0.05 };
      const result = calculateGrahamFairPrice(data);
      expect(result).toBeGreaterThan(0);
      expect(Number.isFinite(result)).toBe(true);
    });
  });

  describe('calculateGrahamDiscount', () => {
    it('should calculate discount as (fairPrice - price) / fairPrice', () => {
      const fairPrice = calculateGrahamFairPrice(baseMockData);
      const result = calculateGrahamDiscount(baseMockData);
      const expected = (fairPrice - baseMockData.PRECO) / fairPrice;
      expect(result).toBe(expected);
    });

    it('should return positive discount when price is below fair price', () => {
      const data = { ...baseMockData, PRECO: 10 };
      const result = calculateGrahamDiscount(data);
      expect(result).toBeGreaterThan(0);
    });

    it('should return negative discount when price is above fair price', () => {
      const fairPrice = calculateGrahamFairPrice(baseMockData);
      const data = { ...baseMockData, PRECO: fairPrice * 1.5 };
      const result = calculateGrahamDiscount(data);
      expect(result).toBeLessThan(0);
    });

    it('should return zero discount when price equals fair price', () => {
      const fairPrice = calculateGrahamFairPrice(baseMockData);
      const data = { ...baseMockData, PRECO: fairPrice };
      const result = calculateGrahamDiscount(data);
      expect(result).toBeCloseTo(0, 5);
    });

    it('should be deterministic', () => {
      const result1 = calculateGrahamDiscount(baseMockData);
      const result2 = calculateGrahamDiscount(baseMockData);
      expect(result1).toBe(result2);
    });
  });

  describe('calculateGrahamCeelingPrice', () => {
    it('should calculate ceiling price with 30% discount margin', () => {
      const fairPrice = calculateGrahamFairPrice(baseMockData);
      const result = calculateGrahamCeelingPrice(baseMockData);
      const expected = fairPrice / 1.3;
      expect(result).toBeCloseTo(expected, 5);
    });

    it('should return a positive number', () => {
      const result = calculateGrahamCeelingPrice(baseMockData);
      expect(result).toBeGreaterThan(0);
    });

    it('should always be less than fair price', () => {
      const fairPrice = calculateGrahamFairPrice(baseMockData);
      const ceilingPrice = calculateGrahamCeelingPrice(baseMockData);
      expect(ceilingPrice).toBeLessThan(fairPrice);
    });

    it('should be deterministic', () => {
      const result1 = calculateGrahamCeelingPrice(baseMockData);
      const result2 = calculateGrahamCeelingPrice(baseMockData);
      expect(result1).toBe(result2);
    });

    it('should apply discount margin consistently', () => {
      const discountMargin = 0.3;
      const fairPrice = calculateGrahamFairPrice(baseMockData);
      const ceilingPrice = calculateGrahamCeelingPrice(baseMockData);
      expect(ceilingPrice).toBeCloseTo(fairPrice / (1 + discountMargin), 5);
    });
  });

  describe('Graham model integration', () => {
    it('ceiling price should be less than fair price which may be less than or equal to current price', () => {
      const fairPrice = calculateGrahamFairPrice(baseMockData);
      const ceilingPrice = calculateGrahamCeelingPrice(baseMockData);
      expect(ceilingPrice).toBeLessThan(fairPrice);
    });

    it('should handle a complete stock analysis scenario', () => {
      const fairPrice = calculateGrahamFairPrice(baseMockData);
      const discount = calculateGrahamDiscount(baseMockData);
      const ceilingPrice = calculateGrahamCeelingPrice(baseMockData);

      expect(fairPrice).toBeGreaterThan(0);
      expect(ceilingPrice).toBeGreaterThan(0);
      expect(ceilingPrice).toBeLessThan(fairPrice);
      expect(Number.isFinite(discount)).toBe(true);
    });

    it('should produce consistent results across different stock scenarios', () => {
      const highGrowthStock = { ...baseMockData, ' LPA': 5.0, ' VPA': 20.0 };
      const lowGrowthStock = { ...baseMockData, ' LPA': 1.0, ' VPA': 5.0 };

      const highFairPrice = calculateGrahamFairPrice(highGrowthStock);
      const lowFairPrice = calculateGrahamFairPrice(lowGrowthStock);

      expect(highFairPrice).toBeGreaterThan(lowFairPrice);
    });
  });
});
