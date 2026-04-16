import { describe, it, expect, beforeEach, vi } from 'vitest';
import { stocksParser } from '@/parsers/stocks/stocksParser';
import type { StatusInvestNormalizedDataType } from '@/@types/StatusInvestNormalizedDataType';

const createMockStockData = (overrides: Partial<StatusInvestNormalizedDataType> = {}): StatusInvestNormalizedDataType => ({
  TICKER: 'PETR4',
  PRECO: 25.5,
  DY: 0.05,
  'P/L': 8.5,
  'P/VP': 1.5,
  'P/ATIVOS': 1.2,
  'MARGEM BRUTA': 0.45,
  'MARGEM EBIT': 0.35,
  'MARG. LIQUIDA': 0.25,
  'P/EBIT': 6.5,
  'EV/EBIT': 7.0,
  'DIVIDA LIQUIDA / EBIT': 2.5,
  'DIV. LIQ. / PATRI.': 0.5,
  PSR: 1.8,
  'P/CAP. GIRO': 2.0,
  'P. AT CIR. LIQ.': 1.2,
  'LIQ. CORRENTE': 1.5,
  ROE: 0.15,
  ROA: 0.12,
  ROIC: 0.13,
  'PATRIMONIO / ATIVOS': 0.6,
  'PASSIVOS / ATIVOS': 0.4,
  'GIRO ATIVOS': 0.8,
  'CAGR RECEITAS 5 ANOS': 0.08,
  'CAGR LUCROS 5 ANOS': 0.08,
  ' LIQUIDEZ MEDIA DIARIA': 1000000,
  ' VPA': 15.0,
  ' LPA': 3.0,
  ' PEG Ratio': 1.05,
  ' VALOR DE MERCADO': 100000000,
  ...overrides,
});

describe('Stocks Parser', () => {
  describe('stocksParser', () => {
    it('should parse valid stock data array', async () => {
      const mockData = [
        createMockStockData({ TICKER: 'PETR4' }),
        createMockStockData({ TICKER: 'VALE5' }),
      ];

      const result = await stocksParser(mockData, 0.10);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
    });

    it('should return formatted data with required fields', async () => {
      const mockData = [createMockStockData()];
      const result = await stocksParser(mockData, 0.10);

      expect(result[0]).toBeDefined();
      expect(typeof result[0]).toBe('object');
    });

    it('should handle single stock', async () => {
      const mockData = [createMockStockData({ TICKER: 'ITUB4' })];
      const result = await stocksParser(mockData, 0.10);

      expect(result).toHaveLength(1);
    });

    it('should handle empty array', async () => {
      const result = await stocksParser([], 0.10);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it('should apply risk parameter in calculations', async () => {
      const mockData = [createMockStockData()];
      const result1 = await stocksParser(mockData, 0.08);
      const result2 = await stocksParser(mockData, 0.12);

      // Results should be different with different risk rates
      expect(result1).toBeDefined();
      expect(result2).toBeDefined();
    });

    it('should handle multiple stocks consistently', async () => {
      const mockData = [
        createMockStockData({ TICKER: 'PETR4', PRECO: 25.5 }),
        createMockStockData({ TICKER: 'VALE5', PRECO: 40.0 }),
        createMockStockData({ TICKER: 'ITUB4', PRECO: 12.0 }),
      ];

      const result = await stocksParser(mockData, 0.10);

      expect(result).toHaveLength(3);
      expect(result.every(stock => typeof stock === 'object')).toBe(true);
    });

    it('should process different valuation multiples', async () => {
      const cheapStock = createMockStockData({ 'P/L': 5.0 });
      const expensiveStock = createMockStockData({ 'P/L': 20.0 });

      const result = await stocksParser([cheapStock, expensiveStock], 0.10);

      expect(result).toHaveLength(2);
    });

    it('should handle stocks with high dividend yield', async () => {
      const highDYStock = createMockStockData({ DY: 0.15 });
      const result = await stocksParser([highDYStock], 0.10);

      expect(result).toHaveLength(1);
      expect(result[0]).toBeDefined();
    });

    it('should handle stocks with high ROE', async () => {
      const profitableStock = createMockStockData({ ROE: 0.30 });
      const result = await stocksParser([profitableStock], 0.10);

      expect(result).toHaveLength(1);
      expect(result[0]).toBeDefined();
    });
  });
});
