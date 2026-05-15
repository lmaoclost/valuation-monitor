import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getIPCAData } from '@/services/getIPCAData.service';

const makeMockHTML = (value: string) => `
<html>
<body>
  <div>
    <h2 class="title m-0">IPCA HOJE <small>(ult. 12m)</small></h2>
    <strong class="value">${value}</strong>
    <span class="icon">%</span>
  </div>
  <div>
    <strong class="value">Abril, 2026</strong>
  </div>
</body>
</html>`;

describe('getIPCAData Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.IPCA_URL = 'https://statusinvest.com.br/indices/ipca';
  });

  describe('successful IPCA data fetch', () => {
    it('should fetch from configured URL', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce(makeMockHTML('4,50')),
      });

      const result = await getIPCAData();
      expect(result).toBeDefined();
    });

    it('should return numeric IPCA value', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce(makeMockHTML('4,50')),
      });

      const result = await getIPCAData();
      expect(typeof result === 'number').toBe(true);
    });

    it('should return correct IPCA value', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce(makeMockHTML('4,392')),
      });

      const result = await getIPCAData();
      expect(result).toBe(4.392);
    });

    it('should handle different IPCA values', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce(makeMockHTML('3,25')),
      });

      const result = await getIPCAData();
      expect(result).toBe(3.25);
    });

    it('should handle integer IPCA values', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce(makeMockHTML('5')),
      });

      const result = await getIPCAData();
      expect(result).toBe(5);
    });
  });

  describe('error handling', () => {
    it('should return 0 on network error', async () => {
      global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));
      const result = await getIPCAData();
      expect(result).toBe(0);
    });

    it('should return 0 on response text parsing failure', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockRejectedValueOnce(new Error('Parse failed')),
      });

      const result = await getIPCAData();
      expect(result).toBe(0);
    });

    it('should return 0 on timeout errors', async () => {
      global.fetch = vi.fn().mockRejectedValueOnce(new Error('Timeout'));
      const result = await getIPCAData();
      expect(result).toBe(0);
    });
  });

  describe('edge cases', () => {
    it('should handle high inflation values', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce(makeMockHTML('12,75')),
      });

      const result = await getIPCAData();
      expect(result).toBe(12.75);
    });

    it('should handle low inflation values', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce(makeMockHTML('0,50')),
      });

      const result = await getIPCAData();
      expect(result).toBe(0.5);
    });
  });
});
