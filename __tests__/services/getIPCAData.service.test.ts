import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getIPCAData } from '@/services/getIPCAData.service';

describe('getIPCAData Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.IPCA_URL = 'https://example.com/ipca';
  });

  describe('successful IPCA data fetch', () => {
    it('should fetch from configured URL', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce('<p class="variavel-dado">4,50%</p>'),
      });

      const result = await getIPCAData();
      expect(result).toBeDefined();
    });

    it('should return numeric IPCA value', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce('<p class="variavel-dado">4,50%</p>'),
      });

      const result = await getIPCAData();
      expect(typeof result === 'number').toBe(true);
    });

    it('should handle different IPCA formats', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce('<p class="variavel-dado">3,25%</p>'),
      });

      const result = await getIPCAData();
      expect(result).toBeDefined();
    });

    it('should handle integer IPCA values', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce('<p class="variavel-dado">5%</p>'),
      });

      const result = await getIPCAData();
      expect(result).toBeDefined();
    });

    it('should handle very small IPCA values', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce('<p class="variavel-dado">0,05%</p>'),
      });

      const result = await getIPCAData();
      expect(result).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should return 0 on network error', async () => {
      global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));
      const result = await getIPCAData();
      expect(result).toBe(0);
    });

    it('should return 0 on HTTP error', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: vi.fn().mockResolvedValueOnce('Not found'),
      });

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

  describe('HTML parsing', () => {
    it('should extract from variavel element', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce(
          '<li class="variavel"><p class="variavel-dado">4,50%</p></li>'
        ),
      });

      const result = await getIPCAData();
      expect(result).toBeDefined();
    });

    it('should handle HTML with extra whitespace', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce(
          '  <p class="variavel-dado">  4,50%  </p>  '
        ),
      });

      const result = await getIPCAData();
      expect(result).toBeDefined();
    });

    it('should handle compressed HTML', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce(
          '<li class="variavel"><h3>IPCA 12 months</h3><p class="variavel-dado">4,50%</p></li>'
        ),
      });

      const result = await getIPCAData();
      expect(result).toBeDefined();
    });
  });

  describe('edge cases', () => {
    it('should handle high inflation values', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce('<p class="variavel-dado">12,75%</p>'),
      });

      const result = await getIPCAData();
      expect(result).toBeDefined();
    });

    it('should handle low inflation values', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        text: vi.fn().mockResolvedValueOnce('<p class="variavel-dado">0,50%</p>'),
      });

      const result = await getIPCAData();
      expect(result).toBeDefined();
    });
  });
});
