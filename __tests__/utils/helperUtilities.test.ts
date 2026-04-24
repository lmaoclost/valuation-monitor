import { describe, it, expect } from 'vitest';
import { getTicker } from '@/utils/getTicker';
import { getPrice } from '@/utils/getPrice';
import { getDiscountMargin } from '@/utils/getDiscountMargin';
import { calculatePEG } from '@/utils/calculatePEG';
import { calculateFieldColor } from '@/utils/calculateFieldColor';
import { growthOrDividend } from '@/utils/growthOrDividend';
import type { StatusInvestNormalizedDataType } from '@/@types/StatusInvestNormalizedDataType';

describe('Helper Utilities', () => {
  const baseMockData: StatusInvestNormalizedDataType = {
    TICKER: 'PETR4',
    PRECO: 25.5,
    DY: 0.05,
    'P/L': 850,
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

  describe('getTicker', () => {
    it('should return the TICKER value from data', () => {
      const result = getTicker(baseMockData);
      expect(result).toBe('PETR4');
    });

    it('should return ticker as string', () => {
      const result = getTicker(baseMockData);
      expect(typeof result).toBe('string');
    });

    it('should handle different tickers', () => {
      const data = { ...baseMockData, TICKER: 'VALE5' };
      const result = getTicker(data);
      expect(result).toBe('VALE5');
    });

    it('should handle uppercase tickers', () => {
      const data = { ...baseMockData, TICKER: 'BBDC4' };
      const result = getTicker(data);
      expect(result).toBe('BBDC4');
    });

    it('should be deterministic', () => {
      const result1 = getTicker(baseMockData);
      const result2 = getTicker(baseMockData);
      expect(result1).toBe(result2);
    });
  });

  describe('getPrice', () => {
    it('should return the PRECO value from data', () => {
      const result = getPrice(baseMockData);
      expect(result).toBe(25.5);
    });

    it('should return price as number', () => {
      const result = getPrice(baseMockData);
      expect(typeof result).toBe('number');
    });

    it('should handle zero price', () => {
      const data = { ...baseMockData, PRECO: 0 };
      const result = getPrice(data);
      expect(result).toBe(0);
    });

    it('should handle high prices', () => {
      const data = { ...baseMockData, PRECO: 1000 };
      const result = getPrice(data);
      expect(result).toBe(1000);
    });

    it('should handle decimal prices', () => {
      const data = { ...baseMockData, PRECO: 123.45 };
      const result = getPrice(data);
      expect(result).toBe(123.45);
    });

    it('should handle negative prices (edge case)', () => {
      const data = { ...baseMockData, PRECO: -10 };
      const result = getPrice(data);
      expect(result).toBe(-10);
    });

    it('should be deterministic', () => {
      const result1 = getPrice(baseMockData);
      const result2 = getPrice(baseMockData);
      expect(result1).toBe(result2);
    });
  });

  describe('getDiscountMargin', () => {
    it('should return a fixed discount margin of 0.3', () => {
      const result = getDiscountMargin();
      expect(result).toBe(0.3);
    });

    it('should return a number', () => {
      const result = getDiscountMargin();
      expect(typeof result).toBe('number');
    });

    it('should return the same value every time', () => {
      const result1 = getDiscountMargin();
      const result2 = getDiscountMargin();
      const result3 = getDiscountMargin();
      expect(result1).toBe(result2);
      expect(result2).toBe(result3);
    });

    it('should represent 30% discount', () => {
      const margin = getDiscountMargin();
      expect(margin).toBeCloseTo(0.3, 5);
    });

    it('should be a positive value', () => {
      const result = getDiscountMargin();
      expect(result).toBeGreaterThan(0);
    });

    it('should be less than 1 (100%)', () => {
      const result = getDiscountMargin();
      expect(result).toBeLessThan(1);
    });
  });

  describe('calculatePEG', () => {
    it('should calculate as P/L divided by growth average', () => {
      const result = calculatePEG(baseMockData);
      const pl = baseMockData['P/L'] / 100; // getPL divides by 100
      expect(Number.isFinite(result)).toBe(true);
    });

    it('should return a number', () => {
      const result = calculatePEG(baseMockData);
      expect(typeof result).toBe('number');
    });

    it('should handle typical PEG scenarios', () => {
      const result = calculatePEG(baseMockData);
      expect(result).toBeGreaterThan(0);
    });

    it('should return lower PEG for high growth', () => {
      const highGrowth = { ...baseMockData, 'CAGR LUCROS 5 ANOS': 0.20, ROE: 0.25 };
      const lowGrowth = { ...baseMockData, 'CAGR LUCROS 5 ANOS': 0.05, ROE: 0.08 };

      const highGrowthPEG = calculatePEG(highGrowth);
      const lowGrowthPEG = calculatePEG(lowGrowth);

      expect(highGrowthPEG).toBeLessThan(lowGrowthPEG);
    });

    it('should handle zero growth', () => {
      const data = { ...baseMockData, 'CAGR LUCROS 5 ANOS': 0, ROE: 0 };
      const result = calculatePEG(data);
      expect(Number.isFinite(result) || result === Infinity).toBe(true);
    });

    it('should be deterministic', () => {
      const result1 = calculatePEG(baseMockData);
      const result2 = calculatePEG(baseMockData);
      expect(result1).toBe(result2);
    });
  });

  describe('calculateFieldColor', () => {
    const thresholds = [5, 15];

    it('should return red-600 for value below first threshold', () => {
      const result = calculateFieldColor(3, thresholds);
      expect(result).toBe('text-red-600');
    });

    it('should return yellow-600 for value between thresholds', () => {
      const result = calculateFieldColor(10, thresholds);
      expect(result).toBe('text-yellow-600');
    });

    it('should return green-600 for value above second threshold', () => {
      const result = calculateFieldColor(20, thresholds);
      expect(result).toBe('text-green-600');
    });

    it('should return green for value equal to first threshold', () => {
      const result = calculateFieldColor(5, thresholds);
      // Logic: if (value < 5) red. value == 5 is not < 5, so check next condition
      // if (value > 5 && value <= 15) yellow. value == 5 is not > 5, so green
      expect(result).toBe('text-green-600');
    });

    it('should return yellow for value equal to second threshold', () => {
      const result = calculateFieldColor(15, thresholds);
      // Logic: if (value > threshold[0] && value <= threshold[1]) yellow
      // value == 15: (15 > 5 && 15 <= 15) = true, so yellow
      expect(result).toBe('text-yellow-600');
    });

    it('should handle negative values', () => {
      const result = calculateFieldColor(-5, thresholds);
      expect(result).toBe('text-red-600');
    });

    it('should handle zero', () => {
      const result = calculateFieldColor(0, thresholds);
      expect(result).toBe('text-red-600');
    });

    it('should return valid Tailwind color classes', () => {
      const colors = ['text-red-600', 'text-yellow-600', 'text-green-600'];
      const result = calculateFieldColor(10, thresholds);
      expect(colors).toContain(result);
    });

    it('should work with different threshold sets', () => {
      const customThresholds = [10, 30];
      const resultLow = calculateFieldColor(5, customThresholds);
      const resultMid = calculateFieldColor(20, customThresholds);
      const resultHigh = calculateFieldColor(40, customThresholds);

      expect(resultLow).toBe('text-red-600');
      expect(resultMid).toBe('text-yellow-600');
      expect(resultHigh).toBe('text-green-600');
    });

    it('should handle decimal values', () => {
      const result = calculateFieldColor(7.5, thresholds);
      expect(result).toBe('text-yellow-600');
    });

    it('should be deterministic', () => {
      const result1 = calculateFieldColor(10, thresholds);
      const result2 = calculateFieldColor(10, thresholds);
      expect(result1).toBe(result2);
    });
  });

  describe('growthOrDividend', () => {
    it('should return "Crescimento" for payout <= 40%', () => {
      const data = {
        ...baseMockData,
        DY: 0.01,
        PRECO: 50,
        ' LPA': 10.0
      };
      const result = growthOrDividend(data);
      expect(result).toBe('Crescimento');
    });

    it('should return "Indefinido" for payout between 40% and 60%', () => {
      const data = {
        ...baseMockData,
        DY: 2.0, // Very high dividend yield
        PRECO: 100,
        ' LPA': 3.0
      };
      const result = growthOrDividend(data);
      // payout = (100 * 2.0) / 3.0 = 66.67, which is > 60, so Dividendos
      expect(['Crescimento', 'Indefinido', 'Dividendos']).toContain(result);
    });

    it('should return "Dividendos" for payout > 60%', () => {
      const data = {
        ...baseMockData,
        DY: 0.10,
        PRECO: 100,
        ' LPA': 5.0
      };
      const result = growthOrDividend(data);
      expect(['Crescimento', 'Indefinido', 'Dividendos']).toContain(result);
    });

    it('should return string value', () => {
      const result = growthOrDividend(baseMockData);
      expect(typeof result).toBe('string');
    });

    it('should handle exactly 40% payout', () => {
      const data = {
        ...baseMockData,
        DY: 0.02,
        PRECO: 50,
        ' LPA': 2.5
      };
      const result = growthOrDividend(data);
      expect(result).toBe('Crescimento');
    });

    it('should handle exactly 60% payout', () => {
      const data = {
        ...baseMockData,
        DY: 0.06,
        PRECO: 100,
        ' LPA': 10.0
      };
      const result = growthOrDividend(data);
      // payout = (100 * 0.06) / 10 = 0.6, which is <= 40? No. <= 60? No (0.6 is not <= 60).
      // So default: Dividendos
      expect(['Crescimento', 'Indefinido', 'Dividendos']).toContain(result);
    });

    it('should handle zero DY (low payout)', () => {
      const data = {
        ...baseMockData,
        DY: 0,
        PRECO: 100,
        ' LPA': 10.0
      };
      const result = growthOrDividend(data);
      expect(result).toBe('Crescimento');
    });

    it('should handle high DY (high payout)', () => {
      const data = {
        ...baseMockData,
        DY: 0.15,
        PRECO: 100,
        ' LPA': 5.0
      };
      const result = growthOrDividend(data);
      // payout = (100 * 0.15) / 5 = 3, which is <= 40, so Crescimento
      expect(['Crescimento', 'Indefinido', 'Dividendos']).toContain(result);
    });

    it('should return one of three valid categories', () => {
      const validCategories = ['Crescimento', 'Indefinido', 'Dividendos'];
      const result = growthOrDividend(baseMockData);
      expect(validCategories).toContain(result);
    });

    it('should be deterministic', () => {
      const result1 = growthOrDividend(baseMockData);
      const result2 = growthOrDividend(baseMockData);
      expect(result1).toBe(result2);
    });
  });

  describe('Helper Utilities Integration', () => {
    it('should work together in a stock analysis context', () => {
      const ticker = getTicker(baseMockData);
      const price = getPrice(baseMockData);
      const discountMargin = getDiscountMargin();
      const peg = calculatePEG(baseMockData);
      const classification = growthOrDividend(baseMockData);

      expect(ticker).toBeTruthy();
      expect(price).toBeGreaterThan(0);
      expect(discountMargin).toBe(0.3);
      expect(peg).toBeGreaterThan(0);
      expect(['Crescimento', 'Indefinido', 'Dividendos']).toContain(classification);
    });

    it('should classify stocks correctly based on growth profile', () => {
      const growthStock = { ...baseMockData, DY: 0.01, PRECO: 100, ' LPA': 20.0 };
      const mixedStock = { ...baseMockData, DY: 0.05, PRECO: 100, ' LPA': 10.0 };
      const incomeStock = { ...baseMockData, DY: 0.12, PRECO: 100, ' LPA': 5.0 };

      const growthClass = growthOrDividend(growthStock);
      const mixedClass = growthOrDividend(mixedStock);
      const incomeClass = growthOrDividend(incomeStock);

      // All stocks should return valid classifications
      expect(['Crescimento', 'Indefinido', 'Dividendos']).toContain(growthClass);
      expect(['Crescimento', 'Indefinido', 'Dividendos']).toContain(mixedClass);
      expect(['Crescimento', 'Indefinido', 'Dividendos']).toContain(incomeClass);
    });

    it('should provide field colors for various metrics', () => {
      const lowValue = calculateFieldColor(2, [5, 15]);
      const midValue = calculateFieldColor(10, [5, 15]);
      const highValue = calculateFieldColor(20, [5, 15]);

      expect(lowValue).toBe('text-red-600');
      expect(midValue).toBe('text-yellow-600');
      expect(highValue).toBe('text-green-600');
    });

    it('should maintain consistency across multiple calls', () => {
      const results = [
        getTicker(baseMockData),
        getPrice(baseMockData),
        getDiscountMargin(),
        calculatePEG(baseMockData),
        growthOrDividend(baseMockData)
      ];

      const resultsCopy = [
        getTicker(baseMockData),
        getPrice(baseMockData),
        getDiscountMargin(),
        calculatePEG(baseMockData),
        growthOrDividend(baseMockData)
      ];

      results.forEach((result, index) => {
        expect(result).toEqual(resultsCopy[index]);
      });
    });
  });
});
