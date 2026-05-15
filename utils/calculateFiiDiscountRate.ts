export const calculateFiiDiscountRate = (
  tesouroRate: number,
  riskPremium: number,
): number => {
  return tesouroRate + riskPremium;
};
