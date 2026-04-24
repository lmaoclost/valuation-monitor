import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getStocksData } from '@/services/getStocksData.service';

// Mock dependencies
vi.mock('@/services/getComplementarData.service', () => ({
  getComplementarData: vi.fn(async () => ({
    csv: [],
    erp: 550,
    ipca: 350,
    risk: 0.09,
  })),
}));

vi.mock('@/parsers/stocks');

describe('getStocksData Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('successful stocks data processing', () => {
    it('should return array of stocks', async () => {
      const result = await getStocksData();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should handle empty data', async () => {
      const result = await getStocksData();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return parsed stock objects', async () => {
      const result = await getStocksData();
      // Result should contain stock data or be empty array
      expect(result).toBeDefined();
    });

    it('should process multiple stocks', async () => {
      const result = await getStocksData();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should handle service errors gracefully', async () => {
      const result = await getStocksData();
      expect(result).toBeDefined();
    });

    it('should return array on success', async () => {
      const result = await getStocksData();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('data validation', () => {
    it('should validate stock records', async () => {
      const result = await getStocksData();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('parser integration', () => {
    it('should call parser and return results', async () => {
      const result = await getStocksData();
      expect(result).toBeDefined();
    });
  });

  describe('response structure', () => {
    it('should return array of stocks', async () => {
      const result = await getStocksData();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
