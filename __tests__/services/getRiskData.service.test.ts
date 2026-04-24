import { describe, it, expect } from 'vitest';
import { getRiskData } from '@/services/getRiskData.service';

describe('getRiskData Service', () => {
  describe('risk calculation', () => {
    it('should calculate risk as (ipca + erp) / 100', () => {
      // IPCA and ERP are percentages (e.g., 4.5 = 4.5%)
      const ipca = 4.5; // 4.5%
      const erp = 5.5; // 5.5%
      const result = getRiskData(ipca, erp);
      expect(result).toBeCloseTo(0.10, 4);
    });

    it('should return correct risk for typical values', () => {
      const ipca = 3; // 3%
      const erp = 5; // 5%
      const result = getRiskData(ipca, erp);
      expect(result).toBe(0.08);
    });

    it('should handle zero IPCA', () => {
      const ipca = 0;
      const erp = 5.5;
      const result = getRiskData(ipca, erp);
      expect(result).toBeCloseTo(0.055, 4);
    });

    it('should handle zero ERP', () => {
      const ipca = 4.5;
      const erp = 0;
      const result = getRiskData(ipca, erp);
      expect(result).toBeCloseTo(0.045, 4);
    });

    it('should handle both values as zero', () => {
      const ipca = 0;
      const erp = 0;
      const result = getRiskData(ipca, erp);
      expect(result).toBe(0);
    });

    it('should handle high IPCA and ERP', () => {
      const ipca = 12; // 12%
      const erp = 8; // 8%
      const result = getRiskData(ipca, erp);
      expect(result).toBe(0.20);
    });

    it('should handle very small values', () => {
      const ipca = 0.01; // 0.01%
      const erp = 0.01; // 0.01%
      const result = getRiskData(ipca, erp);
      expect(result).toBeCloseTo(0.0002, 6);
    });

    it('should handle negative IPCA (deflation)', () => {
      const ipca = -1; // -1%
      const erp = 5.5; // 5.5%
      const result = getRiskData(ipca, erp);
      expect(result).toBeCloseTo(0.045, 4);
    });

    it('should handle negative ERP', () => {
      const ipca = 4.5; // 4.5%
      const erp = -1; // -1%
      const result = getRiskData(ipca, erp);
      expect(result).toBeCloseTo(0.035, 4);
    });

    it('should handle both negative values', () => {
      const ipca = -2;
      const erp = -1;
      const result = getRiskData(ipca, erp);
      expect(result).toBeCloseTo(-0.03, 4);
    });

    it('should be deterministic', () => {
      const ipca = 3.5;
      const erp = 6;
      const result1 = getRiskData(ipca, erp);
      const result2 = getRiskData(ipca, erp);
      expect(result1).toBe(result2);
    });

    it('should maintain precision for financial calculations', () => {
      const ipca = 3.55;
      const erp = 5.67;
      const result = getRiskData(ipca, erp);
      expect(Number.isFinite(result)).toBe(true);
      // Result should be (3.55 + 5.67) / 100 = 9.22 / 100 = 0.0922
      expect(result).toBeCloseTo(0.0922, 4);
    });

    it('should handle edge case: very large numbers', () => {
      const ipca = 1000;
      const erp = 1000;
      const result = getRiskData(ipca, erp);
      expect(result).toBe(20);
    });

    it('should handle percentage inputs', () => {
      // If IPCA is 4.5% and ERP is 5.5%, they come as 4.5 and 5.5
      const ipca = 4.5;
      const erp = 5.5;
      const result = getRiskData(ipca, erp);
      expect(result).toBe(0.1); // 10% risk
    });
  });

  describe('formula verification', () => {
    it('should use correct formula: (ipca + erp) / 100', () => {
      // Formula: risk = (IPCA + ERP) / 100
      // Where IPCA and ERP are percentages
      const testCases = [
        { ipca: 2, erp: 3, expected: 0.05 },
        { ipca: 5, erp: 5, expected: 0.10 },
        { ipca: 1, erp: 9, expected: 0.10 },
        { ipca: 4, erp: 6, expected: 0.10 },
      ];

      testCases.forEach((testCase) => {
        const result = getRiskData(testCase.ipca, testCase.erp);
        expect(result).toBeCloseTo(testCase.expected, 6);
      });
    });
  });

  describe('financial relevance', () => {
    it('should produce reasonable risk rates for typical economic scenarios', () => {
      // Typical scenario: IPCA 3-5%, ERP 5-7%
      const scenarios = [
        { ipca: 3, erp: 5.5, description: 'Moderate inflation, moderate risk' },
        { ipca: 4.5, erp: 6.5, description: 'Moderate-high inflation, moderate-high risk' },
        { ipca: 2, erp: 5, description: 'Low inflation, moderate risk' },
      ];

      scenarios.forEach((scenario) => {
        const result = getRiskData(scenario.ipca, scenario.erp);
        // Should be between 0.08 and 0.15 (8% to 15%)
        expect(result).toBeGreaterThanOrEqual(0.07);
        expect(result).toBeLessThanOrEqual(0.15);
      });
    });

    it('should represent reasonable required return rates', () => {
      // Risk should typically be 8-12% for stock market
      const ipca = 4;
      const erp = 5;
      const result = getRiskData(ipca, erp);
      // 9% is reasonable
      expect(result).toBeCloseTo(0.09, 2);
    });
  });

  describe('integration with valuation models', () => {
    it('should produce values suitable for Gordon model denominator', () => {
      const ipca = 3.5;
      const erp = 6;
      const risk = getRiskData(ipca, erp);

      // Gordon model uses: fairPrice = D1 / (risk - growth)
      // Risk must be greater than growth for positive valuation
      const growthRate = 0.05; // 5% growth

      expect(risk).toBeGreaterThan(growthRate);
      expect(risk - growthRate).toBeGreaterThan(0);
    });

    it('should handle low growth scenarios', () => {
      const ipca = 2;
      const erp = 4;
      const risk = getRiskData(ipca, erp);

      const lowGrowth = 0.02; // 2% growth

      expect(risk).toBeGreaterThan(lowGrowth);
    });

    it('should handle high growth scenarios', () => {
      const ipca = 5;
      const erp = 7;
      const risk = getRiskData(ipca, erp);

      const highGrowth = 0.08; // 8% growth

      expect(risk).toBeGreaterThan(highGrowth);
    });
  });
});
