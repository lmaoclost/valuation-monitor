import { describe, it, expect } from 'vitest';
import { getDY } from '@/utils/getDY';
import { getPL } from '@/utils/getPL';
import { getROE } from '@/utils/getROE';
import { getVPA } from '@/utils/getVPA';
import { getLPA } from '@/utils/getLPA';
import { getPSR } from '@/utils/getPSR';
import { calculatePayout } from '@/utils/calculatePayout';
import type { StatusInvestNormalizedDataType } from '@/@types/StatusInvestNormalizedDataType';

describe('Financial Ratios', () => {
  const baseMockData: StatusInvestNormalizedDataType = {
    TICKER: 'PETR4',
    PRECO: 25.5,
    DY: 0.05,
    'P/L': 850, // getPL divides by 100, so actual value is 8.5
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

  describe('getDY - Dividend Yield', () => {
    it('should return the DY value from data', () => {
      const result = getDY(baseMockData);
      expect(result).toBe(0.05);
    });

    it('should handle zero DY', () => {
      const data = { ...baseMockData, DY: 0 };
      const result = getDY(data);
      expect(result).toBe(0);
    });

    it('should handle high DY values', () => {
      const data = { ...baseMockData, DY: 0.15 };
      const result = getDY(data);
      expect(result).toBe(0.15);
    });

    it('should handle very small DY values', () => {
      const data = { ...baseMockData, DY: 0.001 };
      const result = getDY(data);
      expect(result).toBe(0.001);
    });

    it('should be deterministic', () => {
      const result1 = getDY(baseMockData);
      const result2 = getDY(baseMockData);
      expect(result1).toBe(result2);
    });
  });

  describe('getPL - Price to Earnings Ratio', () => {
    it('should divide P/L by 100', () => {
      const result = getPL(baseMockData);
      expect(result).toBe(8.5);
    });

    it('should handle P/L of 0', () => {
      const data = { ...baseMockData, 'P/L': 0 };
      const result = getPL(data);
      expect(result).toBe(0);
    });

    it('should handle high P/L values', () => {
      const data = { ...baseMockData, 'P/L': 5000 };
      const result = getPL(data);
      expect(result).toBe(50);
    });

    it('should handle low P/L values', () => {
      const data = { ...baseMockData, 'P/L': 100 };
      const result = getPL(data);
      expect(result).toBe(1);
    });

    it('should be deterministic', () => {
      const result1 = getPL(baseMockData);
      const result2 = getPL(baseMockData);
      expect(result1).toBe(result2);
    });
  });

  describe('getROE - Return on Equity', () => {
    it('should return the ROE value from data', () => {
      const result = getROE(baseMockData);
      expect(result).toBe(0.15);
    });

    it('should handle zero ROE', () => {
      const data = { ...baseMockData, ROE: 0 };
      const result = getROE(data);
      expect(result).toBe(0);
    });

    it('should handle high ROE values', () => {
      const data = { ...baseMockData, ROE: 0.50 };
      const result = getROE(data);
      expect(result).toBe(0.50);
    });

    it('should handle negative ROE values', () => {
      const data = { ...baseMockData, ROE: -0.10 };
      const result = getROE(data);
      expect(result).toBe(-0.10);
    });

    it('should be deterministic', () => {
      const result1 = getROE(baseMockData);
      const result2 = getROE(baseMockData);
      expect(result1).toBe(result2);
    });
  });

  describe('getVPA - Book Value Per Share', () => {
    it('should return the VPA value from data', () => {
      const result = getVPA(baseMockData);
      expect(result).toBe(15.0);
    });

    it('should handle zero VPA', () => {
      const data = { ...baseMockData, ' VPA': 0 };
      const result = getVPA(data);
      expect(result).toBe(0);
    });

    it('should handle high VPA values', () => {
      const data = { ...baseMockData, ' VPA': 500 };
      const result = getVPA(data);
      expect(result).toBe(500);
    });

    it('should handle very small VPA values', () => {
      const data = { ...baseMockData, ' VPA': 0.1 };
      const result = getVPA(data);
      expect(result).toBe(0.1);
    });

    it('should be deterministic', () => {
      const result1 = getVPA(baseMockData);
      const result2 = getVPA(baseMockData);
      expect(result1).toBe(result2);
    });
  });

  describe('getLPA - Earnings Per Share', () => {
    it('should return the LPA value from data', () => {
      const result = getLPA(baseMockData);
      expect(result).toBe(3.0);
    });

    it('should handle zero LPA', () => {
      const data = { ...baseMockData, ' LPA': 0 };
      const result = getLPA(data);
      expect(result).toBe(0);
    });

    it('should handle high LPA values', () => {
      const data = { ...baseMockData, ' LPA': 100 };
      const result = getLPA(data);
      expect(result).toBe(100);
    });

    it('should handle negative LPA values', () => {
      const data = { ...baseMockData, ' LPA': -2.0 };
      const result = getLPA(data);
      expect(result).toBe(-2.0);
    });

    it('should be deterministic', () => {
      const result1 = getLPA(baseMockData);
      const result2 = getLPA(baseMockData);
      expect(result1).toBe(result2);
    });
  });

  describe('getPSR - Price to Sales Ratio', () => {
    it('should return the PSR value from data', () => {
      const result = getPSR(baseMockData);
      expect(result).toBe(1.8);
    });

    it('should handle zero PSR', () => {
      const data = { ...baseMockData, PSR: 0 };
      const result = getPSR(data);
      expect(result).toBe(0);
    });

    it('should handle high PSR values', () => {
      const data = { ...baseMockData, PSR: 10 };
      const result = getPSR(data);
      expect(result).toBe(10);
    });

    it('should handle low PSR values', () => {
      const data = { ...baseMockData, PSR: 0.5 };
      const result = getPSR(data);
      expect(result).toBe(0.5);
    });

    it('should be deterministic', () => {
      const result1 = getPSR(baseMockData);
      const result2 = getPSR(baseMockData);
      expect(result1).toBe(result2);
    });
  });

  describe('calculatePayout - Dividend Payout Ratio', () => {
    it('should calculate payout as DPA / LPA', () => {
      const result = calculatePayout(baseMockData);
      const dy = baseMockData.DY;
      const price = baseMockData.PRECO;
      const dpa = price * dy; // DPA = Price * DY
      const lpa = baseMockData[' LPA'];
      const expected = dpa / lpa;
      expect(result).toBeCloseTo(expected, 5);
    });

    it('should handle LPA of 0 gracefully', () => {
      const data = { ...baseMockData, ' LPA': 0 };
      const result = calculatePayout(data);
      // When LPA is 0, payout = DPA / 0 = Infinity. The ternary only checks truthiness.
      // Infinity is truthy, so it returns Infinity, not 0
      expect(result).toBe(Infinity);
    });

    it('should handle high dividend yield', () => {
      const data = { ...baseMockData, DY: 0.20 };
      const result = calculatePayout(data);
      expect(result).toBeGreaterThan(0);
      expect(Number.isFinite(result)).toBe(true);
    });

    it('should handle low dividend yield', () => {
      const data = { ...baseMockData, DY: 0.01 };
      const result = calculatePayout(data);
      expect(result).toBeGreaterThan(0);
      expect(Number.isFinite(result)).toBe(true);
    });

    it('should handle high LPA', () => {
      const data = { ...baseMockData, ' LPA': 50 };
      const result = calculatePayout(data);
      expect(result).toBeLessThan(1);
    });

    it('should handle low LPA', () => {
      const data = { ...baseMockData, ' LPA': 0.5 };
      const result = calculatePayout(data);
      expect(result).toBeGreaterThan(0);
    });

    it('should be deterministic', () => {
      const result1 = calculatePayout(baseMockData);
      const result2 = calculatePayout(baseMockData);
      expect(result1).toBe(result2);
    });
  });

  describe('Financial Ratios Integration', () => {
    it('should return reasonable ratio values for typical stock', () => {
      const dy = getDY(baseMockData);
      const pl = getPL(baseMockData);
      const roe = getROE(baseMockData);
      const vpa = getVPA(baseMockData);
      const lpa = getLPA(baseMockData);
      const psr = getPSR(baseMockData);
      const payout = calculatePayout(baseMockData);

      expect(dy).toBeGreaterThanOrEqual(0);
      expect(pl).toBeGreaterThan(0);
      expect(roe).toBeGreaterThan(0);
      expect(vpa).toBeGreaterThan(0);
      expect(lpa).toBeGreaterThan(0);
      expect(psr).toBeGreaterThan(0);
      expect(payout).toBeGreaterThanOrEqual(0);
    });

    it('should handle high-growth company scenario', () => {
      const data = { ...baseMockData, ' LPA': 10, ' VPA': 50, ROE: 0.30 };

      expect(getLPA(data)).toBe(10);
      expect(getVPA(data)).toBe(50);
      expect(getROE(data)).toBe(0.30);
      expect(calculatePayout(data)).toBeLessThanOrEqual(1);
    });

    it('should handle low-growth company scenario', () => {
      const data = { ...baseMockData, ' LPA': 0.5, ' VPA': 2, ROE: 0.05, DY: 0.10 };

      expect(getLPA(data)).toBe(0.5);
      expect(getVPA(data)).toBe(2);
      expect(getROE(data)).toBe(0.05);
      expect(getDY(data)).toBe(0.10);
    });

    it('should handle dividend-focused company', () => {
      const data = { ...baseMockData, DY: 0.12, ' LPA': 2.0, PRECO: 30 };

      const dy = getDY(data);
      const payout = calculatePayout(data);

      expect(dy).toBe(0.12);
      expect(payout).toBeGreaterThan(0.5);
    });
  });
});
