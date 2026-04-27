import { describe, it, expect } from 'vitest';
import { stocksDomain } from '@/parsers/stocks/stocksDomain';
import type { StatusInvestNormalizedDataType } from '@/@types/StatusInvestNormalizedDataType';

describe('stocksDomain with bazinRate', () => {
  const mockData: StatusInvestNormalizedDataType = {
    TICKER: 'AAPL',
    PRECO: 150,
    DY: 0.025,
    'P/L': 25,
    'P/VP': 5,
    'P/ATIVOS': 3,
    'MARGEM BRUTA': 0.45,
    'MARGEM EBIT': 0.30,
    'MARG. LIQUIDA': 0.20,
    'P/EBIT': 20,
    'EV/EBIT': 22,
    'DIVIDA LIQUIDA / EBIT': 1,
    'DIV. LIQ. / PATRI.': 0.3,
    PSR: 2,
    'P/CAP. GIRO': 4,
    'P. AT CIR. LIQ.': 3,
    'LIQ. CORRENTE': 1.5,
    ROE: 0.25,
    ROA: 0.15,
    ROIC: 0.20,
    'PATRIMONIO / ATIVOS': 0.6,
    'PASSIVOS / ATIVOS': 0.4,
    'GIRO ATIVOS': 1,
    'CAGR RECEITAS 5 ANOS': 0.10,
    'CAGR LUCROS 5 ANOS': 0.12,
    'LIQUIDEZ MEDIA DIARIA': 5000000,
    'VPA': 30,
    'LPA': 7.5,
    'PEG Ratio': 1.5,
    'VALOR DE MERCADO': 3000000000,
  };

  describe('default bazinRate (0.06)', () => {
    it('should use default rate 0.06 when not provided', () => {
      const result = stocksDomain(mockData, 0.06);
      const expectedBazinFairPrice = (mockData.PRECO * mockData.DY) / 0.06;
      expect(result.bazinFairPrice).toBeCloseTo(expectedBazinFairPrice, 2);
    });
  });

  describe('USA bazinRate (0.03)', () => {
    it('should use rate 0.03 when provided', () => {
      const result = stocksDomain(mockData, 0.06, 0.03);
      const expectedBazinFairPrice = (mockData.PRECO * mockData.DY) / 0.03;
      expect(result.bazinFairPrice).toBeCloseTo(expectedBazinFairPrice, 2);
    });

    it('should return higher fair price with USA rate vs default', () => {
      const withUSA = stocksDomain(mockData, 0.06, 0.03);
      const withDefault = stocksDomain(mockData, 0.06);
      expect(withUSA.bazinFairPrice).toBeGreaterThan(withDefault.bazinFairPrice);
    });

    it('should calculate ceeling price correctly with USA rate', () => {
      const result = stocksDomain(mockData, 0.06, 0.03);
      const fairPrice = (mockData.PRECO * mockData.DY) / 0.03;
      const ceelingExpected = fairPrice / 1.3;
      expect(result.bazinCeelingPrice).toBeCloseTo(ceelingExpected, 2);
    });
  });
});