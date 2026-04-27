export interface MarketConfig {
  riskPremium: number;
  hasIPCA: boolean;
  hasERP: boolean;
}

export const USA_RISK_PREMIUM = 0.06;

export const USA_CONFIG: MarketConfig = {
  riskPremium: USA_RISK_PREMIUM,
  hasIPCA: false,
  hasERP: false,
};