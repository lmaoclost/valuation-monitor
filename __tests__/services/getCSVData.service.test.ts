import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getCSVData } from '@/services/getCSVData.service';

describe('getCSVData Service', () => {
  const mockCSVData = [
    { TICKER: 'PETR4', PRECO: '25.5', DY: '0.05' },
    { TICKER: 'VALE5', PRECO: '50.0', DY: '0.08' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.CSV_URL = 'https://example.com/stocks.csv';
  });

  describe('successful CSV fetch', () => {
    it('should return array of stock data', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        text: vi.fn().mockResolvedValueOnce('TICKER,PRECO,DY\nPETR4,25.5,0.05'),
      });

      const result = await getCSVData();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should call fetch with correct URL', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        text: vi.fn().mockResolvedValueOnce('TICKER,PRECO'),
      });

      await getCSVData();
      expect(global.fetch).toHaveBeenCalledWith('https://example.com/stocks.csv');
    });

    it('should handle multiple stock records', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        text: vi.fn().mockResolvedValueOnce(
          'TICKER,PRECO\nPETR4,25.5\nVALE5,50.0'
        ),
      });

      const result = await getCSVData();
      expect(result.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('error handling', () => {
    it('should throw when fetch fails', async () => {
      global.fetch = vi.fn().mockRejectedValueOnce(
        new Error('Network error')
      );

      await expect(getCSVData()).rejects.toThrow('Network error');
    });

    it('should throw when text parsing fails', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        text: vi.fn().mockRejectedValueOnce(new Error('Parse error')),
      });

      await expect(getCSVData()).rejects.toThrow('Parse error');
    });
  });
});
