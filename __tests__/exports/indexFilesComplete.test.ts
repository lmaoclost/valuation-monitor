import { describe, it, expect } from 'vitest';
import * as utils from '@/utils';
import * as parsersStocks from '@/parsers/stocks';
import * as parsersFii from '@/parsers/fii';
import * as services from '@/services';
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
    it('should export brazilianStocksMetadata from constants', () => {
      expect(constants.brazilianStocksMetadata).toBeDefined();
      expect(typeof constants.brazilianStocksMetadata).toBe('object');
    });

    it('should export stocksPresets from constants', () => {
      expect(constants.stocksPresets).toBeDefined();
    });

    it('should export revalidateDay from constants', () => {
      expect(constants.revalidateDay).toBeDefined();
    });

    it('should export fiiTijoloColumnVisibility from constants', () => {
      expect(constants.fiiTijoloColumnVisibility).toBeDefined();
    });

    it('should export fiiPapelColumnVisibility from constants', () => {
      expect(constants.fiiPapelColumnVisibility).toBeDefined();
    });

    it('should export brStocksColumnVisibility from constants', () => {
      expect(constants.brStocksColumnVisibility).toBeDefined();
    });

    it('should export usaStocksColumnVisibility from constants', () => {
      expect(constants.usaStocksColumnVisibility).toBeDefined();
    });

    it('should export usaReitsColumnVisibility from constants', () => {
      expect(constants.usaReitsColumnVisibility).toBeDefined();
    });
  });

  describe('parsers/fii/index - All Exports', () => {
    it('should export tijoloParser function', () => {
      expect(parsersFii.tijoloParser).toBeDefined();
      expect(typeof parsersFii.tijoloParser).toBe('function');
    });

    it('should export papelParser function', () => {
      expect(parsersFii.papelParser).toBeDefined();
      expect(typeof parsersFii.papelParser).toBe('function');
    });

    it('should export tijoloDomain function', () => {
      expect(parsersFii.tijoloDomain).toBeDefined();
      expect(typeof parsersFii.tijoloDomain).toBe('function');
    });

    it('should export papelDomain function', () => {
      expect(parsersFii.papelDomain).toBeDefined();
      expect(typeof parsersFii.papelDomain).toBe('function');
    });

    it('should export StatusInvestFiiSchema', () => {
      expect(parsersFii.StatusInvestFiiSchema).toBeDefined();
    });

    it('should export FundamentusFiiSchema', () => {
      expect(parsersFii.FundamentusFiiSchema).toBeDefined();
    });

    it('should export fiiListParser function', () => {
      expect(parsersFii.fiiListParser).toBeDefined();
      expect(typeof parsersFii.fiiListParser).toBe('function');
    });

    it('should export fiiListDomain function', () => {
      expect(parsersFii.fiiListDomain).toBeDefined();
      expect(typeof parsersFii.fiiListDomain).toBe('function');
    });

    it('should export fiiListFormatter function', () => {
      expect(parsersFii.fiiListFormatter).toBeDefined();
      expect(typeof parsersFii.fiiListFormatter).toBe('function');
    });
  });

  describe('utils/index - FII Functions', () => {
    it('should export calculateFiiDiscountRate', () => {
      expect(utils.calculateFiiDiscountRate).toBeDefined();
      expect(typeof utils.calculateFiiDiscountRate).toBe('function');
    });

    it('should export calculateFiiDividendYear', () => {
      expect(utils.calculateFiiDividendYear).toBeDefined();
      expect(typeof utils.calculateFiiDividendYear).toBe('function');
    });

    it('should export calculateFiiPresentValue', () => {
      expect(utils.calculateFiiPresentValue).toBeDefined();
      expect(typeof utils.calculateFiiPresentValue).toBe('function');
    });

    it('should export calculateFiiDesinvestment', () => {
      expect(utils.calculateFiiDesinvestment).toBeDefined();
      expect(typeof utils.calculateFiiDesinvestment).toBe('function');
    });

    it('should export calculateFiiFairPrice', () => {
      expect(utils.calculateFiiFairPrice).toBeDefined();
      expect(typeof utils.calculateFiiFairPrice).toBe('function');
    });

    it('should export calculateFiiCeelingPrice', () => {
      expect(utils.calculateFiiCeelingPrice).toBeDefined();
      expect(typeof utils.calculateFiiCeelingPrice).toBe('function');
    });

    it('should export calculateFiiExpectativaCrescimento', () => {
      expect(utils.calculateFiiExpectativaCrescimento).toBeDefined();
      expect(typeof utils.calculateFiiExpectativaCrescimento).toBe('function');
    });

    it('should export calculateFiiBoxplotOutliers', () => {
      expect(utils.calculateFiiBoxplotOutliers).toBeDefined();
      expect(typeof utils.calculateFiiBoxplotOutliers).toBe('function');
    });

    it('should export calculateFiiTijoloFieldColor', () => {
      expect(utils.calculateFiiTijoloFieldColor).toBeDefined();
      expect(typeof utils.calculateFiiTijoloFieldColor).toBe('function');
    });

    it('should export calculateFiiPapelFieldColor', () => {
      expect(utils.calculateFiiPapelFieldColor).toBeDefined();
      expect(typeof utils.calculateFiiPapelFieldColor).toBe('function');
    });
  });

  describe('services/index - FII functions', () => {
    it('should export getFiiCSVData', () => {
      expect(services.getFiiCSVData).toBeDefined();
      expect(typeof services.getFiiCSVData).toBe('function');
    });

    it('should export getFundamentusFiiData', () => {
      expect(services.getFundamentusFiiData).toBeDefined();
      expect(typeof services.getFundamentusFiiData).toBe('function');
    });

    it('should export getTesouroIPCA2035', () => {
      expect(services.getTesouroIPCA2035).toBeDefined();
      expect(typeof services.getTesouroIPCA2035).toBe('function');
    });

    it('should export getFiiComplementarData', () => {
      expect(services.getFiiComplementarData).toBeDefined();
      expect(typeof services.getFiiComplementarData).toBe('function');
    });

    it('should export getRiskFIIData', () => {
      expect(services.getRiskFIIData).toBeDefined();
      expect(typeof services.getRiskFIIData).toBe('function');
    });

    it('should export getFiiTijoloData', () => {
      expect(services.getFiiTijoloData).toBeDefined();
      expect(typeof services.getFiiTijoloData).toBe('function');
    });

    it('should export getFiiPapelData', () => {
      expect(services.getFiiPapelData).toBeDefined();
      expect(typeof services.getFiiPapelData).toBe('function');
    });

    it('should export getFiiListData', () => {
      expect(services.getFiiListData).toBeDefined();
      expect(typeof services.getFiiListData).toBe('function');
    });
  });
});
