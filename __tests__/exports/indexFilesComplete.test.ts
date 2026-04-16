import { describe, it, expect } from 'vitest';
import * as utils from '@/utils';
import * as parsersStocks from '@/parsers/stocks';
import * as constants from '@/constants';

describe('Index File Re-exports - Full Coverage', () => {
  describe('utils/index - All Functions Exported', () => {
    it('should export getTicker function', () => {
      expect(utils.getTicker).toBeDefined();
      expect(typeof utils.getTicker).toBe('function');
    });

    it('should export getPrice function', () => {
      expect(utils.getPrice).toBeDefined();
      expect(typeof utils.getPrice).toBe('function');
    });

    it('should export getDY function', () => {
      expect(utils.getDY).toBeDefined();
      expect(typeof utils.getDY).toBe('function');
    });

    it('should export getPL function', () => {
      expect(utils.getPL).toBeDefined();
      expect(typeof utils.getPL).toBe('function');
    });

    it('should export getLPA function', () => {
      expect(utils.getLPA).toBeDefined();
      expect(typeof utils.getLPA).toBe('function');
    });

    it('should export getVPA function', () => {
      expect(utils.getVPA).toBeDefined();
      expect(typeof utils.getVPA).toBe('function');
    });

    it('should export getPSR function', () => {
      expect(utils.getPSR).toBeDefined();
      expect(typeof utils.getPSR).toBe('function');
    });

    it('should export getROE function', () => {
      expect(utils.getROE).toBeDefined();
      expect(typeof utils.getROE).toBe('function');
    });

    it('should export calculateDPA function', () => {
      expect(utils.calculateDPA).toBeDefined();
      expect(typeof utils.calculateDPA).toBe('function');
    });

    it('should export calculatePayout function', () => {
      expect(utils.calculatePayout).toBeDefined();
      expect(typeof utils.calculatePayout).toBe('function');
    });

    it('should export calculateCagrProfit function', () => {
      expect(utils.calculateCagrProfit).toBeDefined();
      expect(typeof utils.calculateCagrProfit).toBe('function');
    });

    it('should export calculateD1 function', () => {
      expect(utils.calculateD1).toBeDefined();
      expect(typeof utils.calculateD1).toBe('function');
    });

    it('should export calculatePEG function', () => {
      expect(utils.calculatePEG).toBeDefined();
      expect(typeof utils.calculatePEG).toBe('function');
    });

    it('should export formatCurrency function', () => {
      expect(utils.formatCurrency).toBeDefined();
      expect(typeof utils.formatCurrency).toBe('function');
    });

    it('should export formatPercentage function', () => {
      expect(utils.formatPercentage).toBeDefined();
      expect(typeof utils.formatPercentage).toBe('function');
    });

    it('should export convertFloatToCurrency function', () => {
      expect(utils.convertFloatToCurrency).toBeDefined();
      expect(typeof utils.convertFloatToCurrency).toBe('function');
    });

    it('should export sortNullsLast function', () => {
      expect(utils.sortNullsLast).toBeDefined();
      expect(typeof utils.sortNullsLast).toBe('function');
    });

    it('should export growthOrDividend function', () => {
      expect(utils.growthOrDividend).toBeDefined();
      expect(typeof utils.growthOrDividend).toBe('function');
    });

    it('should export getDiscountMargin function', () => {
      expect(utils.getDiscountMargin).toBeDefined();
      expect(typeof utils.getDiscountMargin).toBe('function');
    });

    it('should export calculateFieldColor function', () => {
      expect(utils.calculateFieldColor).toBeDefined();
      expect(typeof utils.calculateFieldColor).toBe('function');
    });

    it('should export calculateGrowthAverageColor function', () => {
      expect(utils.calculateGrowthAverageColor).toBeDefined();
      expect(typeof utils.calculateGrowthAverageColor).toBe('function');
    });

    it('should export calculatePEGColor function', () => {
      expect(utils.calculatePEGColor).toBeDefined();
      expect(typeof utils.calculatePEGColor).toBe('function');
    });

    it('should export calculatePSRColor function', () => {
      expect(utils.calculatePSRColor).toBeDefined();
      expect(typeof utils.calculatePSRColor).toBe('function');
    });
  });

  describe('parsers/stocks/index - All Exports', () => {
    it('should export stocksFormatter function', () => {
      expect(parsersStocks.stocksFormatter).toBeDefined();
      expect(typeof parsersStocks.stocksFormatter).toBe('function');
    });

    it('should export stocksDomain function', () => {
      expect(parsersStocks.stocksDomain).toBeDefined();
      expect(typeof parsersStocks.stocksDomain).toBe('function');
    });
  });

  describe('constants/index - All Exports', () => {
    it('should export stockMeta from constants', () => {
      expect(constants.stockMeta).toBeDefined();
      expect(typeof constants.stockMeta).toBe('object');
    });

    it('should export stocksPresets from constants', () => {
      expect(constants.stocksPresets).toBeDefined();
    });

    it('should export revalidateDay from constants', () => {
      expect(constants.revalidateDay).toBeDefined();
    });
  });
});
