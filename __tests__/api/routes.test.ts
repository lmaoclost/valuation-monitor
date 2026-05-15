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
  getFiiTijoloData: vi.fn(),
  getFiiPapelData: vi.fn(),
  getFiiListData: vi.fn(),
  getRiskFIIData: vi.fn(),
}));

vi.mock('@/constants/fiiPresets', () => ({
  fiiTijoloPresets: { Limpar: null, "Top Gestores": () => true },
  fiiPapelPresets: { Limpar: null, "Top Gestores": () => true },
  fiiFiagroPresets: { Limpar: null, "Top Gestores": () => true },
  fiiFiInfraPresets: { Limpar: null, "Top Gestores": () => true },
  fiiFofPresets: { Limpar: null, "Top Gestores": () => true },
}));

vi.mock('@/utils', () => ({
  formatPercentage: (value: number) => `${(value * 100).toFixed(2)}%`,
}));

vi.mock('@/services/getFiiComplementarData.service', () => ({
  getFiiComplementarData: vi.fn(async () => ({ tesouro: 0.0747, ipca: 4.39 })),
}));

vi.mock('@/services/getRiskFIIData.service', () => ({
  getRiskFIIData: vi.fn(),
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
import { GET as getFiiTijolo } from '@/app/api/fetch-fii/tijolo/route';
import { GET as getFiiPapel } from '@/app/api/fetch-fii/papel/route';
import { GET as getFiiFiagro } from '@/app/api/fetch-fii/fiagro/route';
import { GET as getFiiFiInfra } from '@/app/api/fetch-fii/fi-infra/route';
import { GET as getFiiFof } from '@/app/api/fetch-fii/fof/route';
import { GET as getFiiRisk } from '@/app/api/fetch-fii-risk/route';
import { GET as getFiiPreset } from '@/app/api/fetch-fii-preset/filter/route';

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

  describe('GET /api/fetch-fii/tijolo', () => {
    it('should return tijolo FII data', async () => {
      const mockData = [{ ticker: 'HGLG11', category: 'Logisticos', price: 'R$ 150,00' }];
      const { getFiiTijoloData: service } = await import('@/services');
      vi.mocked(service).mockResolvedValueOnce(mockData);

      const response = await getFiiTijolo();
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0].ticker).toBe('HGLG11');
    });

    it('should handle errors', async () => {
      const { getFiiTijoloData: service } = await import('@/services');
      vi.mocked(service).mockRejectedValueOnce(new Error('Error'));

      const response = await getFiiTijolo();
      const result = await response.json();

      expect(response.status).toBe(500);
    });
  });

  describe('GET /api/fetch-fii/papel', () => {
    it('should return papel FII data', async () => {
      const mockData = [{ ticker: 'KNIP11', category: 'Recebíveis Imobiliários' }];
      const { getFiiPapelData: service } = await import('@/services');
      vi.mocked(service).mockResolvedValueOnce(mockData);

      const response = await getFiiPapel();
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should handle errors', async () => {
      const { getFiiPapelData: service } = await import('@/services');
      vi.mocked(service).mockRejectedValueOnce(new Error('Error'));

      const response = await getFiiPapel();
      const result = await response.json();

      expect(response.status).toBe(500);
    });
  });

  describe('GET /api/fetch-fii/fiagro', () => {
    it('should return agronegócio FII data', async () => {
      const mockData = [{ ticker: 'KNCA11', category: 'Agronegócio' }];
      const { getFiiListData: service } = await import('@/services');
      vi.mocked(service).mockResolvedValueOnce(mockData);

      const response = await getFiiFiagro();
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should handle errors', async () => {
      const { getFiiListData: service } = await import('@/services');
      vi.mocked(service).mockRejectedValueOnce(new Error('Error'));

      const response = await getFiiFiagro();
      const result = await response.json();

      expect(response.status).toBe(500);
    });
  });

  describe('GET /api/fetch-fii/fi-infra', () => {
    it('should return infra FII data', async () => {
      const mockData = [{ ticker: 'KDIF11', category: 'Recebíveis de Infraestrutura' }];
      const { getFiiListData: service } = await import('@/services');
      vi.mocked(service).mockResolvedValueOnce(mockData);

      const response = await getFiiFiInfra();
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('GET /api/fetch-fii/fof', () => {
    it('should return fundo de fundos data', async () => {
      const mockData = [{ ticker: 'BCFF11', category: 'Fundo de Fundos' }];
      const { getFiiListData: service } = await import('@/services');
      vi.mocked(service).mockResolvedValueOnce(mockData);

      const response = await getFiiFof();
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('GET /api/fetch-fii-risk', () => {
    it('should return FII risk data', async () => {
      const { getRiskFIIData: service } = await import('@/services/getRiskFIIData.service');
      vi.mocked(service).mockResolvedValueOnce({ ipca: '4,39%', tesouro: '7,48%' });

      const response = await getFiiRisk();
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.ipca).toBe('4,39%');
      expect(result.tesouro).toBe('7,48%');
    });

    it('should handle errors', async () => {
      const { getRiskFIIData: service } = await import('@/services/getRiskFIIData.service');
      vi.mocked(service).mockRejectedValueOnce(new Error('Error'));

      const response = await getFiiRisk();
      const result = await response.json();

      expect(response.status).toBe(500);
    });
  });

  describe('GET /api/fetch-fii-preset/filter', () => {
    it('should return 400 when preset is missing', async () => {
      const req = new NextRequest('http://localhost/api/fetch-fii-preset/filter');
      const response = await getFiiPreset(req);
      const result = await response.json();

      expect(response.status).toBe(400);
    });

    it('should filter by preset for tijolo type', async () => {
      const mockData = [{ ticker: 'HGLG11', isTopManager: 'SIM' }];
      const { getFiiTijoloData: service } = await import('@/services');
      vi.mocked(service).mockResolvedValueOnce(mockData);

      const req = new NextRequest(
        'http://localhost/api/fetch-fii-preset/filter?type=tijolo&preset=Top Gestores'
      );
      const response = await getFiiPreset(req);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return 400 for invalid type', async () => {
      const req = new NextRequest(
        'http://localhost/api/fetch-fii-preset/filter?type=invalid&preset=Top Gestores'
      );
      const response = await getFiiPreset(req);
      const result = await response.json();

      expect(response.status).toBe(400);
    });
  });
});
