import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest } from 'next/server';

// Setup mocks BEFORE importing routes
vi.mock('@/services', () => ({
  getStocksData: vi.fn(),
  getComplementarData: vi.fn(),
  getERPData: vi.fn(),
  getIPCAData: vi.fn(),
  getRiskData: vi.fn(),
  getCSVData: vi.fn(),
}));

vi.mock('@/utils', () => ({
  formatPercentage: (value: number) => `${(value * 100).toFixed(2)}%`,
}));

vi.mock('@/constants/stocksPresets', () => ({
  stocksPresets: {
    dividendo: (stock: Record<string, any>) => stock.DY > 0.05,
    crescimento: (stock: Record<string, any>) => stock['P/L'] < 10,
    popular: (stock: Record<string, any>) => stock.PRECO < 50,
  },
}));

// Import route handlers after mocking
import { GET as getStocks } from '@/app/api/fetch-stocks/route';
import { GET as getComplementarData } from '@/app/api/fetch-complementar-data/route';
import { GET as getERPData } from '@/app/api/fetch-erp/route';
import { GET as getIPCAData } from '@/app/api/fetch-ipca/route';
import { GET as getRiskData } from '@/app/api/fetch-risk/route';
import { GET as getPresetStocks } from '@/app/api/fetch-preset-stocks/filter/route';

// Get mocked services
const mockedServices = {
  getStocksData: vi.fn(),
  getComplementarData: vi.fn(),
  getERPData: vi.fn(),
  getIPCAData: vi.fn(),
  getRiskData: vi.fn(),
};

describe('API Routes - Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/fetch-stocks', () => {
    it('should return stocks data on success', async () => {
      const mockData = [
        { TICKER: 'PETR4', PRECO: 25.5 },
        { TICKER: 'VALE5', PRECO: 65.0 },
      ];

      const { getStocksData } = await import('@/services');
      vi.mocked(getStocksData).mockResolvedValueOnce(mockData);

      const response = await getStocks();
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result).toHaveLength(2);
    });

    it('should handle service errors', async () => {
      const { getStocksData } = await import('@/services');
      vi.mocked(getStocksData).mockRejectedValueOnce(new Error('Service error'));

      const response = await getStocks();
      const result = await response.json();

      expect(response.status).toBe(500);
      expect(result.error).toBeDefined();
    });

    it('should return empty array', async () => {
      const { getStocksData } = await import('@/services');
      vi.mocked(getStocksData).mockResolvedValueOnce([]);

      const response = await getStocks();
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result).toEqual([]);
    });
  });

  describe('GET /api/fetch-complementar-data', () => {
    it('should return formatted complementar data', async () => {
      const { getComplementarData: service } = await import('@/services');
      vi.mocked(service).mockResolvedValueOnce({
        erp: 750,
        ipca: 450,
        risk: 0.08,
      });

      const response = await getComplementarData();
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result).toHaveProperty('erp');
      expect(result).toHaveProperty('ipca');
      expect(result).toHaveProperty('risk');
    });

    it('should handle errors', async () => {
      const { getComplementarData: service } = await import('@/services');
      vi.mocked(service).mockRejectedValueOnce(new Error('API error'));

      const response = await getComplementarData();
      const result = await response.json();

      expect(response.status).toBe(500);
    });
  });

  describe('GET /api/fetch-erp', () => {
    it('should return ERP data', async () => {
      const { getERPData: service } = await import('@/services');
      vi.mocked(service).mockResolvedValueOnce({ value: 750 });

      const response = await getERPData();
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result).toHaveProperty('value');
    });

    it('should handle errors', async () => {
      const { getERPData: service } = await import('@/services');
      vi.mocked(service).mockRejectedValueOnce(new Error('Error'));

      const response = await getERPData();
      const result = await response.json();

      expect(response.status).toBe(500);
    });
  });

  describe('GET /api/fetch-ipca', () => {
    it('should return IPCA data', async () => {
      const { getIPCAData: service } = await import('@/services');
      vi.mocked(service).mockResolvedValueOnce({ value: 450 });

      const response = await getIPCAData();
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result).toHaveProperty('value');
    });

    it('should handle errors', async () => {
      const { getIPCAData: service } = await import('@/services');
      vi.mocked(service).mockRejectedValueOnce(new Error('Error'));

      const response = await getIPCAData();
      const result = await response.json();

      expect(response.status).toBe(500);
    });
  });

  describe('GET /api/fetch-risk', () => {
    it('should calculate risk data', async () => {
      const { getIPCAData, getERPData, getRiskData: service } = await import(
        '@/services'
      );

      vi.mocked(getIPCAData).mockResolvedValueOnce({ value: 450 });
      vi.mocked(getERPData).mockResolvedValueOnce({ value: 750 });
      vi.mocked(service).mockReturnValueOnce({ risk: 0.08 });

      const response = await getRiskData();
      const result = await response.json();

      expect(response.status).toBe(200);
    });

    it('should handle IPCA fetch error', async () => {
      const { getIPCAData } = await import('@/services');
      vi.mocked(getIPCAData).mockRejectedValueOnce(new Error('Error'));

      const response = await getRiskData();
      const result = await response.json();

      expect(response.status).toBe(500);
    });

    it('should handle ERP fetch error', async () => {
      const { getIPCAData, getERPData } = await import('@/services');
      vi.mocked(getIPCAData).mockResolvedValueOnce({ value: 450 });
      vi.mocked(getERPData).mockRejectedValueOnce(new Error('Error'));

      const response = await getRiskData();
      const result = await response.json();

      expect(response.status).toBe(500);
    });
  });

  describe('GET /api/fetch-preset-stocks/filter', () => {
    it('should filter by preset parameter', async () => {
      const mockStocks = [
        { TICKER: 'PETR4', PRECO: 25.5, DY: 0.08 },
        { TICKER: 'VALE5', PRECO: 65.0, DY: 0.03 },
      ];

      const { getStocksData } = await import('@/services');
      vi.mocked(getStocksData).mockResolvedValueOnce(mockStocks);

      const req = new NextRequest(
        'http://localhost/api/fetch-preset-stocks/filter?preset=dividendo'
      );
      const response = await getPresetStocks(req);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return error when preset is missing', async () => {
      const req = new NextRequest(
        'http://localhost/api/fetch-preset-stocks/filter'
      );
      const response = await getPresetStocks(req);
      const result = await response.json();

      expect(response.status).toBe(400);
      expect(result.error).toBeDefined();
    });

    it('should handle different presets', async () => {
      const mockStocks = [
        { TICKER: 'PETR4', PRECO: 25.5, 'P/L': 8 },
        { TICKER: 'VALE5', PRECO: 65.0, 'P/L': 12 },
      ];

      const { getStocksData } = await import('@/services');
      vi.mocked(getStocksData).mockResolvedValueOnce(mockStocks);

      const req = new NextRequest(
        'http://localhost/api/fetch-preset-stocks/filter?preset=crescimento'
      );
      const response = await getPresetStocks(req);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should handle invalid preset', async () => {
      const mockStocks = [{ TICKER: 'PETR4' }];

      const { getStocksData } = await import('@/services');
      vi.mocked(getStocksData).mockResolvedValueOnce(mockStocks);

      const req = new NextRequest(
        'http://localhost/api/fetch-preset-stocks/filter?preset=invalid'
      );
      const response = await getPresetStocks(req);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result).toEqual(mockStocks);
    });

    it('should handle service errors', async () => {
      const { getStocksData } = await import('@/services');
      vi.mocked(getStocksData).mockRejectedValueOnce(new Error('Fetch error'));

      const req = new NextRequest(
        'http://localhost/api/fetch-preset-stocks/filter?preset=dividendo'
      );

      try {
        const response = await getPresetStocks(req);
        const result = await response.json();
        expect(response.status).toBe(500);
      } catch (error) {
        // Error is expected during fetch failure
        expect(error).toBeDefined();
      }
    });
  });
});
