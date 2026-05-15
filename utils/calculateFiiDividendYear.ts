export const calculateFiiDividendYear = (
  previousDividend: number,
  growthRate: number,
): number => {
  return previousDividend * (1 + growthRate);
};
