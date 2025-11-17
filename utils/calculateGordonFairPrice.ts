import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";
import { calculateD1 } from "./calculateD1";
import { calculateGrowthAverage } from "./calculateGrowthAverage";

export const calculateGordonFairPrice = (
  value: StatusInvestDataType,
  risk: number,
) => {
  const d1 = calculateD1(value);
  const growthAverage = calculateGrowthAverage(value);

  const fairPrice = d1 / (risk - growthAverage);

  return fairPrice * 100;
};
