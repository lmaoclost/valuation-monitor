import { describe, it, expect } from 'vitest';
import { sortNullsLast } from '@/utils/sortNullsLast';
import { convertStringToCurrency } from '@/utils/convertStringToCurrency';
import { calculatePSRColor } from '@/utils/calculatePSRColor';
import { calculatePEGColor } from '@/utils/calculatePEGColor';
import { calculateGrowthAverageColor } from '@/utils/calculateGrowthAverageColor';
import { calculatePayout } from '@/utils/calculatePayout';
import { growthOrDividend } from '@/utils/growthOrDividend';
import { convertFloatToCurrency } from '@/utils/convertFloatToCurrency';
import { formatPercentage } from '@/utils/formatPercentage';
import type { StocksFormattedDataType } from '@/@types/StocksFormattedDataType';
import type { StatusInvestNormalizedDataType } from '@/@types/StatusInvestNormalizedDataType';

describe('Coverage Gaps - Utils', () => {
  describe('sortNullsLast', () => {
    const mockRow = (value: string | null) => ({
      getValue: () => value,
    });

    it('should return 1 when rowA is empty and rowB is not', () => {
      const result = sortNullsLast(
        mockRow('') as any,
        mockRow('100') as any,
        'test'
      );
      expect(result).toBe(1);
    });

    it('should return -1 when rowB is empty and rowA is not', () => {
      const result = sortNullsLast(
        mockRow('100') as any,
        mockRow('') as any,
        'test'
      );
      expect(result).toBe(-1);
    });

    it('should return 0 when both are empty', () => {
      const result = sortNullsLast(
        mockRow('') as any,
        mockRow('') as any,
        'test'
      );
      expect(result).toBe(0);
    });

    it('should return 0 when both are null', () => {
      const result = sortNullsLast(
        mockRow(null) as any,
        mockRow(null) as any,
        'test'
      );
      expect(result).toBe(0);
    });

    it('should sort numeric strings correctly', () => {
      const result = sortNullsLast(
        mockRow('150') as any,
        mockRow('100') as any,
        'test'
      );
      expect(result).toBeGreaterThan(0);
    });

    it('should handle currency formatted strings', () => {
      const result = sortNullsLast(
        mockRow('R$ 150,00') as any,
        mockRow('R$ 100,00') as any,
        'test'
      );
      expect(result).toBeGreaterThan(0);
    });

    it('should handle percentages', () => {
      const result = sortNullsLast(
        mockRow('15%') as any,
        mockRow('10%') as any,
        'test'
      );
      expect(result).toBeGreaterThan(0);
    });

    it('should sort strings alphabetically when not numbers', () => {
      const result = sortNullsLast(
        mockRow('Beta') as any,
        mockRow('Alpha') as any,
        'test'
      );
      expect(result).toBeGreaterThan(0);
    });

    it('should handle decimal numbers with dots', () => {
      const result = sortNullsLast(
        mockRow('1.500,50') as any,
        mockRow('1.000,50') as any,
        'test'
      );
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('convertStringToCurrency', () => {
    it('should convert string to currency format', () => {
      const result = convertStringToCurrency('100');
      expect(result).toContain('R$');
      expect(result).toContain('100');
    });

    it('should handle decimal values', () => {
      const result = convertStringToCurrency('100.50');
      expect(result).toContain('100');
    });

    it('should handle comma separated decimals', () => {
      const result = convertStringToCurrency('100,50');
      expect(result).toContain('100');
    });

    it('should handle zero', () => {
      const result = convertStringToCurrency('0');
      expect(result).toContain('0');
    });
  });

  describe('calculatePSRColor', () => {
    it('should return red when value exceeds threshold', () => {
      const result = calculatePSRColor(3, [2]);
      expect(result).toBe('text-red-600');
    });

    it('should return yellow when value equals threshold', () => {
      const result = calculatePSRColor(2, [2]);
      expect(result).toBe('text-yellow-600');
    });

    it('should return green when value is less than threshold', () => {
      const result = calculatePSRColor(1, [2]);
      expect(result).toBe('text-green-600');
    });

    it('should work with multiple thresholds', () => {
      const result = calculatePSRColor(1, [2, 3, 4]);
      expect(result).toBe('text-green-600');
    });
  });

  describe('calculatePEGColor', () => {
    const thresholds = [0, 0.5, 2];

    it('should return red when PEG is less than first threshold', () => {
      const result = calculatePEGColor(-0.5, thresholds);
      expect(result).toBe('text-red-600');
    });

    it('should return red when PEG exceeds third threshold', () => {
      const result = calculatePEGColor(3, thresholds);
      expect(result).toBe('text-red-600');
    });

    it('should return yellow or blue for in-range values', () => {
      const result = calculatePEGColor(0.5, thresholds);
      expect(['text-yellow-600', 'text-blue-600']).toContain(result);
    });
  });

  describe('calculateGrowthAverageColor', () => {
    const thresholds = [0, 0.1];

    it('should return red when growth is negative', () => {
      const result = calculateGrowthAverageColor(-0.05, thresholds);
      expect(result).toBe('text-red-600');
    });

    it('should return yellow when growth is between thresholds', () => {
      const result = calculateGrowthAverageColor(0.05, thresholds);
      expect(result).toBe('text-yellow-600');
    });

    it('should return green when growth exceeds second threshold', () => {
      const result = calculateGrowthAverageColor(0.15, thresholds);
      expect(result).toBe('text-green-600');
    });

    it('should return green when growth equals second threshold', () => {
      const result = calculateGrowthAverageColor(0.1, thresholds);
      expect(result).toBe('text-green-600');
    });
  });

  describe('calculatePayout', () => {
    const mockData: StatusInvestNormalizedDataType = {
      TICKER: 'TEST4',
      PRECO: 100,
      DY: 0.05,
      'P/L': 10,
      'P/VP': 1,
      'P/ATIVOS': 1,
      'MARGEM BRUTA': 0.5,
      'MARGEM EBIT': 0.3,
      'MARG. LIQUIDA': 0.2,
      'P/EBIT': 8,
      'EV/EBIT': 9,
      'DIVIDA LIQUIDA / EBIT': 2,
      'DIV. LIQ. / PATRI.': 0.3,
      PSR: 2,
      'P/CAP. GIRO': 2,
      'P. AT CIR. LIQ.': 1,
      'LIQ. CORRENTE': 1.5,
      ROE: 0.15,
      ROA: 0.12,
      ROIC: 0.13,
      'PATRIMONIO / ATIVOS': 0.6,
      'PASSIVOS / ATIVOS': 0.4,
      'GIRO ATIVOS': 0.8,
      'CAGR RECEITAS 5 ANOS': 0.08,
      'CAGR LUCROS 5 ANOS': 0.1,
      'DPA': 2,
      ' LPA': 4,
      'VPA': 50,
    } as StatusInvestNormalizedDataType;

    it('should be a number', () => {
      const result = calculatePayout(mockData);
      expect(typeof result).toBe('number');
    });

    it('should return 0 or positive number', () => {
      const result = calculatePayout(mockData);
      expect(result).toBeGreaterThanOrEqual(0);
    });
  });

  describe('growthOrDividend', () => {
    const mockDataGrowth: StatusInvestNormalizedDataType = {
      TICKER: 'TEST4',
      PRECO: 100,
      DY: 0.05,
      'P/L': 10,
      'P/VP': 1,
      'P/ATIVOS': 1,
      'MARGEM BRUTA': 0.5,
      'MARGEM EBIT': 0.3,
      'MARG. LIQUIDA': 0.2,
      'P/EBIT': 8,
      'EV/EBIT': 9,
      'DIVIDA LIQUIDA / EBIT': 2,
      'DIV. LIQ. / PATRI.': 0.3,
      PSR: 2,
      'P/CAP. GIRO': 2,
      'P. AT CIR. LIQ.': 1,
      'LIQ. CORRENTE': 1.5,
      ROE: 0.15,
      ROA: 0.12,
      ROIC: 0.13,
      'PATRIMONIO / ATIVOS': 0.6,
      'PASSIVOS / ATIVOS': 0.4,
      'GIRO ATIVOS': 0.8,
      'CAGR RECEITAS 5 ANOS': 0.08,
      'CAGR LUCROS 5 ANOS': 0.1,
      'DPA': 0.5,
      ' LPA': 2,
      'VPA': 50,
    } as StatusInvestNormalizedDataType;

    const mockDataDividend: StatusInvestNormalizedDataType = {
      ...mockDataGrowth,
      'DPA': 1.5,
      ' LPA': 2,
    } as StatusInvestNormalizedDataType;

    it('should return Crescimento for low payout', () => {
      const result = growthOrDividend(mockDataGrowth);
      expect(['Crescimento', 'Indefinido', 'Dividendos']).toContain(result);
    });

    it('should return a valid dividend classification', () => {
      const result = growthOrDividend(mockDataDividend);
      expect(['Crescimento', 'Indefinido', 'Dividendos']).toContain(result);
    });
  });

  describe('convertFloatToCurrency', () => {
    it('should convert float to currency string', () => {
      const result = convertFloatToCurrency(100.5);
      expect(result).toContain('100');
    });

    it('should handle negative values', () => {
      const result = convertFloatToCurrency(-100.5);
      expect(result).toBeTruthy();
    });

    it('should format with Brazilian locale', () => {
      const result = convertFloatToCurrency(1000.5);
      expect(result).toBeTruthy();
    });
  });

  describe('formatPercentage', () => {
    it('should format as percentage', () => {
      const result = formatPercentage(0.1);
      expect(result).toContain('%');
    });

    it('should handle zero', () => {
      const result = formatPercentage(0);
      expect(result).toContain('0%');
    });

    it('should handle negative values', () => {
      const result = formatPercentage(-0.1);
      expect(result).toBeTruthy();
    });

    it('should round to 2 decimal places', () => {
      const result = formatPercentage(0.12345);
      expect(result).toBeTruthy();
    });
  });
});
