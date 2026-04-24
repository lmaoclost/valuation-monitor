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

  it('Bancos filter matches banks segment', () => {
    const filter = stocksPresets.Bancos;
    expect(filter).toBeDefined();
    expect(filter!({ segmentname: 'Bancos' } as any)).toBe(true);
    expect(filter!({ segmentname: 'Outros' } as any)).toBe(false);
  });

  it('Energia elétrica filter matches', () => {
    const filter = stocksPresets['Energia elétrica'];
    expect(filter).toBeDefined();
    expect(filter!({ segmentname: 'Energia elétrica' } as any)).toBe(true);
    expect(filter!({ segmentname: 'Outros' } as any)).toBe(false);
  });

  it('Água e saneamento filter matches', () => {
    const filter = stocksPresets['Água e saneamento'];
    expect(filter).toBeDefined();
    expect(filter!({ segmentname: 'Água e saneamento' } as any)).toBe(true);
    expect(filter!({ segmentname: 'Outros' } as any)).toBe(false);
  });

  it('Seguradoras filter matches', () => {
    const filter = stocksPresets.Seguradoras;
    expect(filter).toBeDefined();
    expect(filter!({ segmentname: 'Seguradoras' } as any)).toBe(true);
    expect(filter!({ segmentname: 'Outros' } as any)).toBe(false);
  });

  it('Cíclico filter matches', () => {
    const filter = stocksPresets.Cíclico;
    expect(filter).toBeDefined();
    expect(filter!({ cicle: 'SIM' } as any)).toBe(true);
    expect(filter!({ cicle: 'NÃO' } as any)).toBe(false);
  });

  it('Não Cíclico filter matches', () => {
    const filter = stocksPresets['Não Cíclico'];
    expect(filter).toBeDefined();
    expect(filter!({ cicle: 'NÃO' } as any)).toBe(true);
    expect(filter!({ cicle: 'SIM' } as any)).toBe(false);
  });
});
