import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";
import { calculateD1 } from "./calculateD1";
import { calculateGrowthAverage } from "./calculateGrowthAverage";

export const calculateGordonFairPrice = (
  value: StatusInvestNormalizedDataType,
  risk: number,
) => {
  const d1 = calculateD1(value);
  const growthAverage = calculateGrowthAverage(value);

  const fairPrice = d1 / (risk - growthAverage);

  return fairPrice;
};
