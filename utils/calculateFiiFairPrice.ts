export const calculateFiiFairPrice = (
  presentValues: number[],
  presentValueDesinvestment: number,
): number => {
  const sumPV = presentValues.reduce((acc, pv) => acc + pv, 0);
  return sumPV + presentValueDesinvestment;
};
