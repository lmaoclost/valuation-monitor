import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getERPData } from '@/services/getERPData.service';

describe('getERPData Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.ERP_URL = 'https://example.com/erp';
  });

  describe('successful ERP data fetch', () => {
    it('should fetch from configured URL', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce('<p>ERP ficou em 5,50%</p>'),
      });

      const result = await getERPData();
      expect(result).toBeDefined();
    });

    it('should return numeric ERP value', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce('<p>ERP ficou em 5,50%</p>'),
      });

      const result = await getERPData();
      expect(typeof result === 'number').toBe(true);
    });

    it('should handle different ERP formats', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce('<p>ERP ficou em 4,25%</p>'),
      });

      const result = await getERPData();
      expect(result).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should throw on network error', async () => {
      global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));
      await expect(getERPData()).rejects.toThrow('Network error');
    });

    it('should throw on HTTP error', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: vi.fn().mockResolvedValueOnce('Not found'),
      });

      await expect(getERPData()).rejects.toThrow();
    });

    it('should handle response text parsing failure', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockRejectedValueOnce(new Error('Parse failed')),
      });

      await expect(getERPData()).rejects.toThrow();
    });
  });

  describe('edge cases', () => {
    it('should handle high ERP values', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce('<p>ERP ficou em 15,75%</p>'),
      });

      const result = await getERPData();
      expect(result).toBeDefined();
    });

    it('should handle low ERP values', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce('<p>ERP ficou em 0,05%</p>'),
      });

      const result = await getERPData();
      expect(result).toBeDefined();
    });

    it('should return 0 when ERP text format is invalid', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce('<p>No match here</p>'),
      });

      const result = await getERPData();
      expect(result).toBe(0);
    });

    it('should return 0 when ERP text is empty', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce('<p></p>'),
      });

      const result = await getERPData();
      expect(result).toBe(0);
    });

    it('should return 0 when ERP regex does not match', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce('<p>Different format 10%</p>'),
      });

      const result = await getERPData();
      expect(result).toBe(0);
    });
  });
});
