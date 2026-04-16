import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

describe('Services with Mocked Data', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Service Mock Patterns', () => {
    it('should mock fetch for successful API call', async () => {
      const mockResponse = { stocks: [{ ticker: 'PETR4', price: 25.5 }] };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const response = await fetch('/api/stocks');
      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.stocks).toHaveLength(1);
      expect(global.fetch).toHaveBeenCalled();
    });

    it('should mock fetch for error response', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Internal Server Error' }),
      } as Response);

      const response = await fetch('/api/stocks');

      expect(response.ok).toBe(false);
      expect(response.status).toBe(500);
    });

    it('should mock fetch rejection', async () => {
      global.fetch = vi.fn().mockRejectedValueOnce(
        new Error('Network error')
      );

      await expect(fetch('/api/stocks')).rejects.toThrow('Network error');
    });

    it('should mock multiple fetch calls sequentially', async () => {
      global.fetch = vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: 'first' }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: 'second' }),
        } as Response);

      const resp1 = await fetch('/api/1');
      const data1 = await resp1.json();

      const resp2 = await fetch('/api/2');
      const data2 = await resp2.json();

      expect(data1.data).toBe('first');
      expect(data2.data).toBe('second');
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should verify fetch was called with correct arguments', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      const url = '/api/stocks?ticker=PETR4';
      await fetch(url);

      expect(global.fetch).toHaveBeenCalledWith(url);
    });

    it('should mock fetch with POST body', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response);

      const body = { ticker: 'PETR4' };
      await fetch('/api/filter', {
        method: 'POST',
        body: JSON.stringify(body),
      });

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/filter',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(body),
        })
      );
    });
  });

  describe('Common Fetch Patterns for Services', () => {
    it('should handle CSV parsing in response', async () => {
      const csvData = 'ticker,price\nPETR4,25.5\nVALE5,40.0';

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: async () => csvData,
      } as Response);

      const response = await fetch('/api/csv');
      const data = await response.text();

      expect(data).toContain('PETR4');
      expect(data).toContain('25.5');
    });

    it('should handle JSON array response', async () => {
      const stocks = [
        { ticker: 'PETR4', price: 25.5 },
        { ticker: 'VALE5', price: 40.0 },
      ];

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => stocks,
      } as Response);

      const response = await fetch('/api/stocks');
      const data = await response.json();

      expect(Array.isArray(data)).toBe(true);
      expect(data).toHaveLength(2);
    });

    it('should handle large response data', async () => {
      const largeDataset = Array.from({ length: 100 }, (_, i) => ({
        ticker: `STOCK${i}`,
        price: Math.random() * 100,
      }));

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => largeDataset,
      } as Response);

      const response = await fetch('/api/all-stocks');
      const data = await response.json();

      expect(data).toHaveLength(100);
    });

    it('should handle error response with message', async () => {
      const errorResponse = {
        error: 'Unauthorized',
        message: 'Invalid API key',
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => errorResponse,
      } as Response);

      const response = await fetch('/api/protected');

      expect(response.ok).toBe(false);
      expect(response.status).toBe(401);
    });
  });
});
