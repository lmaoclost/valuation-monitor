import { describe, it, expect } from 'vitest';
import { revalidateDay } from '../../constants/revalidateDay';
import { stockMeta } from '../../constants/stockMeta';
import { stocksPresets } from '../../constants/stocksPresets';

describe('Constants - revalidateDay', () => {
  it('should export revalidateDay as a number', () => {
    expect(typeof revalidateDay).toBe('number');
    expect(revalidateDay).toBeGreaterThan(0);
  });
});

describe('Constants - stockMeta', () => {
  it('should export stockMeta object', () => {
    expect(stockMeta).toBeDefined();
    expect(typeof stockMeta).toBe('object');
  });

  it('should have properties in stockMeta', () => {
    expect(Object.keys(stockMeta).length).toBeGreaterThan(0);
  });
});

describe('Constants - stocksPresets', () => {
  it('should export stocksPresets object', () => {
    expect(stocksPresets).toBeDefined();
    expect(typeof stocksPresets).toBe('object');
  });

  it('should have Bancos preset', () => {
    expect(stocksPresets).toHaveProperty('Bancos');
  });

  it('should have Energia elétrica preset', () => {
    expect(stocksPresets).toHaveProperty('Energia elétrica');
  });

  it('should have Cíclico preset', () => {
    expect(stocksPresets).toHaveProperty('Cíclico');
  });

  it('each preset should be either null or a function', () => {
    Object.values(stocksPresets).forEach(preset => {
      expect(
        preset === null || typeof preset === 'function'
      ).toBe(true);
    });
  });

  it('stocksPresets should have Limpar preset', () => {
    expect(stocksPresets).toHaveProperty('Limpar');
    expect(stocksPresets.Limpar).toBeNull();
  });
});
