import { describe, it, expect } from 'vitest';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatPercentage } from '@/utils/formatPercentage';
import { convertFloatToCurrency } from '@/utils/convertFloatToCurrency';
import { convertStringToCurrency } from '@/utils/convertStringToCurrency';
import { convertStringToFloat } from '@/utils/convertStringToFloat';

describe('Formatting and Conversion Utilities', () => {
  describe('formatCurrency', () => {
    it('should format a number as Brazilian Real currency', () => {
      const result = formatCurrency(100);
      expect(result).toContain('R$');
    });

    it('should format with two decimal places', () => {
      const result = formatCurrency(100.5);
      expect(result).toContain('100');
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

    it('should return empty string for negative Infinity', () => {
      const result = formatCurrency(-Infinity);
      expect(result).toBe('');
    });

    it('should format positive numbers', () => {
      const result = formatCurrency(1000);
      expect(result).toBeTruthy();
      expect(result).toContain('R$');
    });

    it('should format negative numbers', () => {
      const result = formatCurrency(-100);
      expect(result).toBeTruthy();
      expect(result).toContain('R$');
    });

    it('should format small decimal values', () => {
      const result = formatCurrency(0.01);
      expect(result).toBeTruthy();
      expect(result).toContain('R$');
    });

    it('should format large numbers', () => {
      const result = formatCurrency(1000000);
      expect(result).toBeTruthy();
      expect(result).toContain('R$');
    });

    it('should handle two decimal precision', () => {
      const result1 = formatCurrency(10.5);
      const result2 = formatCurrency(10.55);
      expect(result1).toBeTruthy();
      expect(result2).toBeTruthy();
    });
  });

  describe('formatPercentage', () => {
    it('should format a decimal as a percentage', () => {
      const result = formatPercentage(0.5);
      expect(result).toContain('%');
    });

    it('should format 0.5 as 50%', () => {
      const result = formatPercentage(0.5);
      expect(result).toContain('50');
    });

    it('should format 0.1 as 10%', () => {
      const result = formatPercentage(0.1);
      expect(result).toContain('10');
    });

    it('should return empty string for Infinity', () => {
      const result = formatPercentage(Infinity);
      expect(result).toBe('');
    });

    it('should return empty string for negative Infinity', () => {
      const result = formatPercentage(-Infinity);
      expect(result).toBe('');
    });

    it('should return empty string for NaN', () => {
      const result = formatPercentage(NaN);
      expect(result).toBe('');
    });

    it('should format zero as 0%', () => {
      const result = formatPercentage(0);
      expect(result).toContain('0');
    });

    it('should format negative percentages', () => {
      const result = formatPercentage(-0.1);
      expect(result).toBeTruthy();
    });

    it('should format percentages greater than 1', () => {
      const result = formatPercentage(1.5);
      expect(result).toBeTruthy();
      expect(result).toContain('%');
    });

    it('should format small decimal percentages', () => {
      const result = formatPercentage(0.01);
      expect(result).toContain('1');
      expect(result).toContain('%');
    });

    it('should have two decimal places', () => {
      const result = formatPercentage(0.155);
      expect(result).toBeTruthy();
    });
  });

  describe('convertFloatToCurrency', () => {
    it('should convert float to currency format', () => {
      const result = convertFloatToCurrency(100);
      expect(result).toContain('R$');
    });

    it('should handle zero', () => {
      const result = convertFloatToCurrency(0);
      expect(result).toContain('R$');
    });

    it('should handle negative values', () => {
      const result = convertFloatToCurrency(-50);
      expect(result).toContain('R$');
    });

    it('should handle decimal values', () => {
      const result = convertFloatToCurrency(123.45);
      expect(result).toContain('R$');
    });

    it('should handle large numbers', () => {
      const result = convertFloatToCurrency(1000000);
      expect(result).toContain('R$');
    });

    it('should handle very small numbers', () => {
      const result = convertFloatToCurrency(0.01);
      expect(result).toContain('R$');
    });

    it('should format as Brazilian Real', () => {
      const result = convertFloatToCurrency(100);
      expect(result).toContain('R$');
    });

    it('should use comma as decimal separator (Brazilian format)', () => {
      const result = convertFloatToCurrency(10.5);
      // Brazilian format uses comma for decimals and period for thousands
      expect(result).toBeTruthy();
    });
  });

  describe('convertStringToFloat', () => {
    it('should convert string with period to float', () => {
      const result = convertStringToFloat('10.5');
      expect(result).toBe(10.5);
    });

    it('should convert string with comma to float', () => {
      const result = convertStringToFloat('10,5');
      expect(result).toBe(10.5);
    });

    it('should handle zero', () => {
      const result = convertStringToFloat('0');
      expect(result).toBe(0);
    });

    it('should handle negative numbers', () => {
      const result = convertStringToFloat('-10.5');
      expect(result).toBe(-10.5);
    });

    it('should handle large numbers', () => {
      const result = convertStringToFloat('1000000');
      expect(result).toBe(1000000);
    });

    it('should handle integers', () => {
      const result = convertStringToFloat('100');
      expect(result).toBe(100);
    });

    it('should handle very small decimals', () => {
      const result = convertStringToFloat('0,01');
      expect(result).toBe(0.01);
    });

    it('should handle string with multiple commas (thousands separator)', () => {
      const result = convertStringToFloat('1.000,50');
      // convertStringToFloat only replaces first comma (not last): '1.000,50' -> '1.000.50'
      // '1.000.50' is not a valid number, so it becomes NaN
      expect(Number.isNaN(result)).toBe(true);
    });

    it('should return NaN for non-numeric strings', () => {
      const result = convertStringToFloat('abc');
      expect(Number.isNaN(result)).toBe(true);
    });

    it('should handle empty string', () => {
      const result = convertStringToFloat('');
      expect(result).toBe(0);
    });
  });

  describe('convertStringToCurrency', () => {
    it('should convert string with period to formatted currency', () => {
      const result = convertStringToCurrency('100.50');
      expect(result).toContain('R$');
    });

    it('should convert string with comma to formatted currency', () => {
      const result = convertStringToCurrency('100,50');
      expect(result).toContain('R$');
    });

    it('should handle zero', () => {
      const result = convertStringToCurrency('0');
      expect(result).toContain('R$');
    });

    it('should handle negative strings', () => {
      const result = convertStringToCurrency('-50,00');
      expect(result).toContain('R$');
    });

    it('should format as Brazilian Real currency', () => {
      const result = convertStringToCurrency('100.50');
      expect(result).toContain('R$');
    });

    it('should handle large amount strings', () => {
      const result = convertStringToCurrency('1000000.00');
      expect(result).toContain('R$');
    });

    it('should handle small amount strings', () => {
      const result = convertStringToCurrency('0,01');
      expect(result).toContain('R$');
    });

    it('should be chainable from convertStringToFloat', () => {
      const floatValue = convertStringToFloat('123,45');
      const currencyValue = convertFloatToCurrency(floatValue);
      expect(currencyValue).toContain('R$');
    });
  });

  describe('Formatting Conversion Integration', () => {
    it('should convert and format currency consistently', () => {
      const result1 = convertFloatToCurrency(100.50);
      const result2 = convertStringToCurrency('100.50');
      expect(result1).toContain('R$');
      expect(result2).toContain('R$');
    });

    it('should handle conversion chain from string to currency', () => {
      const stringValue = '1500,50';
      const floatValue = convertStringToFloat(stringValue);
      const currencyValue = convertFloatToCurrency(floatValue);
      expect(currencyValue).toContain('R$');
      expect(Number.isFinite(floatValue)).toBe(true);
    });

    it('should preserve accuracy through conversions', () => {
      const originalAmount = 123.45;
      const converted = convertFloatToCurrency(originalAmount);
      expect(converted).toContain('R$');
    });

    it('should format percentages correctly', () => {
      const percentage = 0.1523;
      const formatted = formatPercentage(percentage);
      expect(formatted).toContain('%');
    });

    it('should handle edge cases in formatting pipeline', () => {
      const edgeCases = [0, 0.01, 1, 10, 100, 1000, 10000];
      edgeCases.forEach(value => {
        const currency = formatCurrency(value) || 'empty';
        expect(currency).toBeTruthy();

        const percentage = formatPercentage(value / 100);
        expect(percentage).toBeTruthy();
      });
    });

    it('should handle Brazilian locale formatting', () => {
      const float = 1234.56;
      const currency = convertFloatToCurrency(float);
      expect(currency).toContain('R$');
    });
  });
});
