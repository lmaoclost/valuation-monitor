import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";
import { calculateGrowthAverage } from "./calculateGrowthAverage";
import { getPL } from "./getPL";

export const calculatePEG = (value: StatusInvestNormalizedDataType) => {
  const pl = getPL(value);
  const growthAverage = calculateGrowthAverage(value);

  return pl / growthAverage;
};
