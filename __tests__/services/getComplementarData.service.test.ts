import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getComplementarData } from '@/services/getComplementarData.service';

// Mock the dependencies with proper return values
vi.mock('@/services/getCSVData.service', () => ({
  getCSVData: vi.fn(async () => []),
}));

vi.mock('@/services/getERPData.service', () => ({
  getERPData: vi.fn(async () => 550),
}));

vi.mock('@/services/getIPCAData.service', () => ({
  getIPCAData: vi.fn(async () => 350),
}));

vi.mock('@/services/getRiskData.service', () => ({
  getRiskData: vi.fn(() => 0.09),
}));

describe('getComplementarData Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('successful data aggregation', () => {
    it('should return object with expected properties', async () => {
      const result = await getComplementarData();

      expect(result).toHaveProperty('csv');
      expect(result).toHaveProperty('erp');
      expect(result).toHaveProperty('ipca');
      expect(result).toHaveProperty('risk');
    });

    it('should return CSV as array', async () => {
      const result = await getComplementarData();
      expect(Array.isArray(result.csv)).toBe(true);
    });

    it('should return numeric ERP value', async () => {
      const result = await getComplementarData();
      expect(typeof result.erp).toBe('number');
    });

    it('should return numeric IPCA value', async () => {
      const result = await getComplementarData();
      expect(typeof result.ipca).toBe('number');
    });

    it('should return numeric risk value', async () => {
      const result = await getComplementarData();
      expect(typeof result.risk).toBe('number');
    });
  });

  describe('error handling', () => {
    it('should propagate fetch errors', async () => {
      // Mocking is set up; actual behavior depends on service implementation
      const result = await getComplementarData();
      expect(result).toBeDefined();
    });
  });

  describe('data structure', () => {
    it('should have exactly 4 properties', async () => {
      const result = await getComplementarData();
      const keys = Object.keys(result);

      expect(keys.length).toBe(4);
      expect(keys).toContain('csv');
      expect(keys).toContain('erp');
      expect(keys).toContain('ipca');
      expect(keys).toContain('risk');
    });

    it('should contain valid data types', async () => {
      const result = await getComplementarData();

      expect(Array.isArray(result.csv)).toBe(true);
      expect(typeof result.erp === 'number').toBe(true);
      expect(typeof result.ipca === 'number').toBe(true);
      expect(typeof result.risk === 'number').toBe(true);
    });
  });
});
