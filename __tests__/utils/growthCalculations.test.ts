import { describe, it, expect } from 'vitest';
import { calculateCagrProfit } from '@/utils/calculateCagrProfit';
import { calculateGrowthAverage } from '@/utils/calculateGrowthAverage';
import { calculateDamoradanGrowth } from '@/utils/calculateDamodaramGrowth';
import { calculateD1 } from '@/utils/calculateD1';
import { calculateDPA } from '@/utils/calculateDPA';
import type { StatusInvestNormalizedDataType } from '@/@types/StatusInvestNormalizedDataType';

describe('Growth and CAGR Calculations', () => {
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

  describe('calculateCagrProfit - CAGR of Profits', () => {
    it('should return the CAGR LUCROS 5 ANOS value', () => {
      const result = calculateCagrProfit(baseMockData);
      expect(result).toBe(0.08);
    });

    it('should handle zero CAGR', () => {
      const data = { ...baseMockData, 'CAGR LUCROS 5 ANOS': 0 };
      const result = calculateCagrProfit(data);
      expect(result).toBe(0);
    });

    it('should handle high growth CAGR', () => {
      const data = { ...baseMockData, 'CAGR LUCROS 5 ANOS': 0.25 };
      const result = calculateCagrProfit(data);
      expect(result).toBe(0.25);
    });

    it('should handle negative CAGR', () => {
      const data = { ...baseMockData, 'CAGR LUCROS 5 ANOS': -0.05 };
      const result = calculateCagrProfit(data);
      expect(result).toBe(-0.05);
    });

    it('should be deterministic', () => {
      const result1 = calculateCagrProfit(baseMockData);
      const result2 = calculateCagrProfit(baseMockData);
      expect(result1).toBe(result2);
    });
  });

  describe('calculateDamoradanGrowth - Damodaran Growth Model', () => {
    it('should calculate as (1 - payout) * ROE', () => {
      const result = calculateDamoradanGrowth(baseMockData);
      const roe = baseMockData.ROE;
      const dy = baseMockData.DY;
      const price = baseMockData.PRECO;
      const dpa = price * dy;
      const lpa = baseMockData[' LPA'];
      const payout = dpa / lpa || 0;
      const expected = (1 - payout) * roe;
      expect(result).toBeCloseTo(expected, 5);
    });

    it('should return positive value for positive ROE and reasonable payout', () => {
      const result = calculateDamoradanGrowth(baseMockData);
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should handle high ROE', () => {
      const data = { ...baseMockData, ROE: 0.40 };
      const result = calculateDamoradanGrowth(data);
      expect(Number.isFinite(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should handle low ROE', () => {
      const data = { ...baseMockData, ROE: 0.02 };
      const result = calculateDamoradanGrowth(data);
      expect(Number.isFinite(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should handle zero ROE', () => {
      const data = { ...baseMockData, ROE: 0 };
      const result = calculateDamoradanGrowth(data);
      expect(result).toBe(0);
    });

    it('should handle high dividend yield (high payout)', () => {
      const data = { ...baseMockData, DY: 0.15 };
      const result = calculateDamoradanGrowth(data);
      expect(Number.isFinite(result)).toBe(true);
    });

    it('should be deterministic', () => {
      const result1 = calculateDamoradanGrowth(baseMockData);
      const result2 = calculateDamoradanGrowth(baseMockData);
      expect(result1).toBe(result2);
    });
  });

  describe('calculateGrowthAverage - Average Growth', () => {
    it('should calculate average of CAGR profit and Damodaran growth', () => {
      const result = calculateGrowthAverage(baseMockData);
      const cagr = calculateCagrProfit(baseMockData);
      const damodaran = calculateDamoradanGrowth(baseMockData);
      const expected = (cagr + damodaran) / 2;
      expect(result).toBeCloseTo(expected, 5);
    });

    it('should return a number', () => {
      const result = calculateGrowthAverage(baseMockData);
      expect(typeof result).toBe('number');
    });

    it('should handle zero growth scenarios', () => {
      const data = {
        ...baseMockData,
        'CAGR LUCROS 5 ANOS': 0,
        ROE: 0,
        DY: 0
      };
      const result = calculateGrowthAverage(data);
      expect(result).toBe(0);
    });

    it('should handle high growth scenarios', () => {
      const data = {
        ...baseMockData,
        'CAGR LUCROS 5 ANOS': 0.20,
        ROE: 0.30
      };
      const result = calculateGrowthAverage(data);
      expect(result).toBeGreaterThan(0);
      expect(Number.isFinite(result)).toBe(true);
    });

    it('should handle mixed growth scenarios', () => {
      const data = {
        ...baseMockData,
        'CAGR LUCROS 5 ANOS': 0.15,
        ROE: 0.10
      };
      const result = calculateGrowthAverage(data);
      expect(Number.isFinite(result)).toBe(true);
    });

    it('should be deterministic', () => {
      const result1 = calculateGrowthAverage(baseMockData);
      const result2 = calculateGrowthAverage(baseMockData);
      expect(result1).toBe(result2);
    });
  });

  describe('calculateDPA - Dividend Per Share', () => {
    it('should calculate as price * DY', () => {
      const result = calculateDPA(baseMockData);
      const expected = baseMockData.PRECO * baseMockData.DY;
      expect(result).toBeCloseTo(expected, 5);
    });

    it('should return 0 when DY is 0', () => {
      const data = { ...baseMockData, DY: 0 };
      const result = calculateDPA(data);
      expect(result).toBe(0);
    });

    it('should handle high dividend yield', () => {
      const data = { ...baseMockData, DY: 0.15 };
      const result = calculateDPA(data);
      expect(result).toBeCloseTo(data.PRECO * 0.15, 5);
    });

    it('should handle low dividend yield', () => {
      const data = { ...baseMockData, DY: 0.01 };
      const result = calculateDPA(data);
      expect(result).toBeCloseTo(data.PRECO * 0.01, 5);
    });

    it('should handle high price', () => {
      const data = { ...baseMockData, PRECO: 100 };
      const result = calculateDPA(data);
      expect(result).toBeCloseTo(100 * baseMockData.DY, 5);
    });

    it('should handle low price', () => {
      const data = { ...baseMockData, PRECO: 5 };
      const result = calculateDPA(data);
      expect(result).toBeCloseTo(5 * baseMockData.DY, 5);
    });

    it('should be deterministic', () => {
      const result1 = calculateDPA(baseMockData);
      const result2 = calculateDPA(baseMockData);
      expect(result1).toBe(result2);
    });
  });

  describe('calculateD1 - Next Year Dividend', () => {
    it('should calculate as DPA * (1 + growth average)', () => {
      const result = calculateD1(baseMockData);
      const dpa = calculateDPA(baseMockData);
      const growth = calculateGrowthAverage(baseMockData);
      const expected = dpa * (1 + growth);
      expect(result).toBeCloseTo(expected, 5);
    });

    it('should return a positive number for positive growth', () => {
      const result = calculateD1(baseMockData);
      expect(result).toBeGreaterThan(0);
    });

    it('should handle zero growth', () => {
      const data = {
        ...baseMockData,
        'CAGR LUCROS 5 ANOS': 0,
        ROE: 0,
        DY: 0
      };
      const result = calculateD1(data);
      expect(result).toBe(0);
    });

    it('should handle negative growth', () => {
      const data = {
        ...baseMockData,
        'CAGR LUCROS 5 ANOS': -0.05,
        ROE: 0.05
      };
      const result = calculateD1(data);
      expect(Number.isFinite(result)).toBe(true);
    });

    it('should handle high growth rates', () => {
      const data = {
        ...baseMockData,
        'CAGR LUCROS 5 ANOS': 0.25,
        ROE: 0.30
      };
      const result = calculateD1(data);
      expect(result).toBeGreaterThan(0);
    });

    it('should be deterministic', () => {
      const result1 = calculateD1(baseMockData);
      const result2 = calculateD1(baseMockData);
      expect(result1).toBe(result2);
    });
  });

  describe('Growth Calculations Integration', () => {
    it('should handle complete growth analysis for high-growth company', () => {
      const data = {
        ...baseMockData,
        'CAGR LUCROS 5 ANOS': 0.20,
        ROE: 0.25,
        DY: 0.02,
        PRECO: 50,
        ' LPA': 5.0
      };

      const cagrProfit = calculateCagrProfit(data);
      const damodaran = calculateDamoradanGrowth(data);
      const growthAvg = calculateGrowthAverage(data);
      const dpa = calculateDPA(data);
      const d1 = calculateD1(data);

      expect(cagrProfit).toBe(0.20);
      expect(damodaran).toBeGreaterThan(0);
      expect(growthAvg).toBeGreaterThan(0);
      expect(dpa).toBeGreaterThan(0);
      expect(d1).toBeGreaterThan(dpa);
    });

    it('should handle complete growth analysis for low-growth company', () => {
      const data = {
        ...baseMockData,
        'CAGR LUCROS 5 ANOS': 0.03,
        ROE: 0.08,
        DY: 0.08,
        PRECO: 20,
        ' LPA': 2.0
      };

      const cagrProfit = calculateCagrProfit(data);
      const damodaran = calculateDamoradanGrowth(data);
      const growthAvg = calculateGrowthAverage(data);
      const dpa = calculateDPA(data);
      const d1 = calculateD1(data);

      expect(cagrProfit).toBe(0.03);
      expect(damodaran).toBeGreaterThanOrEqual(0);
      expect(growthAvg).toBeGreaterThanOrEqual(0);
      expect(dpa).toBeGreaterThan(0);
      expect(d1).toBeGreaterThanOrEqual(dpa);
    });

    it('should consistently calculate growth metrics', () => {
      const growth1 = calculateGrowthAverage(baseMockData);
      const growth2 = calculateGrowthAverage(baseMockData);
      expect(growth1).toBe(growth2);

      const dpa1 = calculateDPA(baseMockData);
      const dpa2 = calculateDPA(baseMockData);
      expect(dpa1).toBe(dpa2);

      const d1_1 = calculateD1(baseMockData);
      const d1_2 = calculateD1(baseMockData);
      expect(d1_1).toBe(d1_2);
    });

    it('should maintain correct relationships between metrics', () => {
      const dpa = calculateDPA(baseMockData);
      const d1 = calculateD1(baseMockData);
      const growth = calculateGrowthAverage(baseMockData);

      if (growth > 0) {
        expect(d1).toBeGreaterThan(dpa);
      } else if (growth === 0) {
        expect(d1).toBeCloseTo(dpa, 5);
      }
    });
  });
});
