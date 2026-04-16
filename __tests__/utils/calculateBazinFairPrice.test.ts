import { describe, it, expect } from 'vitest';
import { calculateBazinFairPrice } from '@/utils/calculateBazinFairPrice';
import type { StatusInvestNormalizedDataType } from '@/@types/StatusInvestNormalizedDataType';

describe('calculateBazinFairPrice', () => {
  const baseMockData: StatusInvestNormalizedDataType = {
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
  };

  it('should calculate fair price and return a number', () => {
    const result = calculateBazinFairPrice(baseMockData);
    expect(typeof result).toBe('number');
  });

  it('should return same result for identical inputs', () => {
    const result1 = calculateBazinFairPrice(baseMockData);
    const result2 = calculateBazinFairPrice(baseMockData);
    expect(result1).toBe(result2);
  });
});
