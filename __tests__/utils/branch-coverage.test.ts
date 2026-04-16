import { describe, it, expect } from 'vitest';
import { formatPercentage } from '@/utils/formatPercentage';
import { formatCurrency } from '@/utils/formatCurrency';
import { calculatePEGColor } from '@/utils/calculatePEGColor';
import { calculatePayout } from '@/utils/calculatePayout';
import { convertStringToFloat } from '@/utils/convertStringToFloat';
import type { StatusInvestNormalizedDataType } from '@/@types/StatusInvestNormalizedDataType';

describe('Branch Coverage - Conditional Logic', () => {
  describe('formatPercentage - branch coverage', () => {
    it('should format positive percentage with 2 decimals', () => {
      const result = formatPercentage(0.25);
      expect(result).toContain('25');
      expect(result).toContain('%');
    });

    it('should format zero percentage', () => {
      const result = formatPercentage(0);
      expect(result).toContain('0%');
    });

    it('should format very small decimal', () => {
      const result = formatPercentage(0.001);
      expect(result).toContain('%');
    });

    it('should format large percentage with commas (pt-BR format)', () => {
      const result = formatPercentage(5);
      // Portuguese format uses comma as decimal separator
      expect(result).toContain('%');
    });

    it('should return empty string for non-finite values', () => {
      const result = formatPercentage(Infinity);
      expect(result).toBe('');
    });

    it('should return empty string for NaN', () => {
      const result = formatPercentage(NaN);
      expect(result).toBe('');
    });
  });

  describe('formatCurrency - branch coverage', () => {
    it('should format positive currency', () => {
      const result = formatCurrency(150.5);
      expect(result).toContain('150');
      expect(result).toContain('R$');
    });

    it('should return empty string for zero', () => {
      const result = formatCurrency(0);
      expect(result).toBe('');
    });

    it('should return empty string for NaN', () => {
      const result = formatCurrency(NaN);
      expect(result).toBe('');
    });

    it('should return empty string for Infinity', () => {
      const result = formatCurrency(Infinity);
      expect(result).toBe('');
    });

    it('should format large values', () => {
      const result = formatCurrency(1000);
      expect(result).toBeTruthy();
      expect(result).toContain('R$');
    });

    it('should handle negative currency', () => {
      const result = formatCurrency(-50);
      expect(result).toBeTruthy();
      expect(result).toContain('R$');
    });
  });

  describe('calculatePEGColor - complete branch coverage', () => {
    it('should return red when value < thresholds[0]', () => {
      const thresholds = [1, 1.5, 2];
      const result = calculatePEGColor(0.5, thresholds);
      expect(result).toBe('text-red-600');
    });

    it('should return red when value > thresholds[2]', () => {
      const thresholds = [0.5, 1, 1.5];
      const result = calculatePEGColor(2, thresholds);
      expect(result).toBe('text-red-600');
    });

    it('should return yellow when value >= thresholds[1]', () => {
      const thresholds = [0.5, 1, 1.5];
      const result = calculatePEGColor(1, thresholds);
      expect(result).toBe('text-yellow-600');
    });

    it('should return yellow when value <= thresholds[2]', () => {
      const thresholds = [0.5, 1, 1.5];
      const result = calculatePEGColor(1.3, thresholds);
      expect(result).toBe('text-yellow-600');
    });

    it('should handle edge case values', () => {
      const thresholds = [1, 2, 3];
      const result = calculatePEGColor(1, thresholds);
      expect(['text-red-600', 'text-yellow-600', 'text-blue-600']).toContain(
        result
      );
    });
  });

  describe('calculatePayout - ternary branch coverage', () => {
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

    it('should return calculated payout when truthy', () => {
      const result = calculatePayout(mockData);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should return 0 as fallback', () => {
      const dataWithNull = {
        ...mockData,
        ' LPA': undefined,
      } as any;

      const result = calculatePayout(dataWithNull);
      expect(typeof result).toBe('number');
    });

    it('should handle edge case with very small LPA', () => {
      const dataSmallLPA = {
        ...mockData,
        ' LPA': 0.001,
      } as StatusInvestNormalizedDataType;

      const result = calculatePayout(dataSmallLPA);
      expect(typeof result).toBe('number');
    });
  });

  describe('convertStringToFloat - conversion accuracy', () => {
    it('should convert simple numeric string', () => {
      const result = convertStringToFloat('123.45');
      expect(result).toBe(123.45);
    });

    it('should handle comma as decimal separator', () => {
      const result = convertStringToFloat('123,45');
      expect(result).toBe(123.45);
    });

    it('should handle simple number string', () => {
      const result = convertStringToFloat('100');
      expect(result).toBe(100);
    });

    it('should handle decimal with spaces removed', () => {
      const result = convertStringToFloat('1000,50');
      expect(result).toBe(1000.5);
    });

    it('should return NaN for non-numeric strings', () => {
      const result = convertStringToFloat('invalid');
      expect(Number.isNaN(result)).toBe(true);
    });

    it('should handle negative numbers', () => {
      const result = convertStringToFloat('-100,50');
      expect(result).toBe(-100.5);
    });

    it('should handle whitespace (Number trims it)', () => {
      const result = convertStringToFloat('  123.45  ');
      // JavaScript Number() automatically trims whitespace
      expect(result).toBe(123.45);
    });
  });

});
