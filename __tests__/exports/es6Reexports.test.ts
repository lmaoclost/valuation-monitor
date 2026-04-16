import { describe, it, expect } from 'vitest';
import * as utils from '../../utils';
import * as constants from '../../constants';

describe('Re-export Modules - ES6 Imports', () => {
  describe('utils/index exports', () => {
    it('should export getTicker as a function', () => {
      expect(typeof utils.getTicker).toBe('function');
    });

    it('should export sortNullsLast as a function', () => {
      expect(typeof utils.sortNullsLast).toBe('function');
    });

    it('should export growthOrDividend as a function', () => {
      expect(typeof utils.growthOrDividend).toBe('function');
    });

    it('should export convertFloatToCurrency as a function', () => {
      expect(typeof utils.convertFloatToCurrency).toBe('function');
    });

    it('should export formatCurrency as a function', () => {
      expect(typeof utils.formatCurrency).toBe('function');
    });
  });

  describe('constants/index exports', () => {
    it('should export stockMeta', () => {
      expect(constants.stockMeta).toBeDefined();
      expect(typeof constants.stockMeta).toBe('object');
    });

    it('should export stocksPresets', () => {
      expect(constants.stocksPresets).toBeDefined();
    });

    it('should export revalidateDay', () => {
      expect(constants.revalidateDay).toBeDefined();
    });
  });
});
