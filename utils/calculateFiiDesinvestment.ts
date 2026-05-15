export const calculateFiiDesinvestment = (
  dividendYear10Year10: number,
  discountRate: number,
): number => {
  return dividendYear10Year10 / discountRate;
};
