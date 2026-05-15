export const calculateFiiPresentValue = (
  desinvestment: number,
  discountRate: number,
  year: number,
): number => {
  return desinvestment / Math.pow(1 + discountRate, year);
};
