import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";
import { calculateDPA } from "./calculateDPA";
import { calculateGrowthAverage } from "./calculateGrowthAverage";

export const calculateD1 = (value: StatusInvestNormalizedDataType) => {
  const dpa = calculateDPA(value);
  const growthAverage = calculateGrowthAverage(value);

  return dpa * (1 + growthAverage);
};
