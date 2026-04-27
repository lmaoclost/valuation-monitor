import { describe, it, expect } from 'vitest';
import { USA_RISK_PREMIUM, USA_CONFIG, MarketConfig } from '@/lib/marketConfig';

describe('marketConfig', () => {
  describe('USA_RISK_PREMIUM', () => {
    it('should be 0.06 (6%)', () => {
      expect(USA_RISK_PREMIUM).toBe(0.06);
    });
  });

  describe('USA_CONFIG', () => {
    it('should have riskPremium of 0.06', () => {
      expect(USA_CONFIG.riskPremium).toBe(0.06);
    });

    it('should not have IPCA', () => {
      expect(USA_CONFIG.hasIPCA).toBe(false);
    });

    it('should not have ERP', () => {
      expect(USA_CONFIG.hasERP).toBe(false);
    });

    it('should match MarketConfig interface', () => {
      const config: MarketConfig = USA_CONFIG;
      expect(config.riskPremium).toBeDefined();
      expect(config.hasIPCA).toBeDefined();
      expect(config.hasERP).toBeDefined();
    });
  });
});