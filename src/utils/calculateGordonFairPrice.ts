import { StatusInvestData } from "@/app/components/table";
import { calculateD1 } from "./calculateD1";
import { calculateGrowthAverage } from "./calculateGrowthAverage";

export const calculateGordonFairPrice = (value: StatusInvestData, risk: number) => {
  const d1 = calculateD1(value);
  const growthAverage = calculateGrowthAverage(value);

  const fairPrice = d1 / (risk / 100 - growthAverage / 100);

  return fairPrice;
}