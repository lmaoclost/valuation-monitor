export const calculateFiiExpectativaCrescimento = (
  price: number,
  fairPrice: number,
): number => {
  if (fairPrice === 0) return 0;
  return (fairPrice - price) / price;
};
