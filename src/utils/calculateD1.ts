import { StatusInvestData } from "@/app/components/table"
import { calculateDPA } from "./calculateDPA"
import { calculateGrowthAverage } from "./calculateGrowthAverage";

export const calculateD1 = (value: StatusInvestData) => {
  const dpa = calculateDPA(value);
  const growthAverage = calculateGrowthAverage(value);

  return dpa * (1 + (growthAverage / 100))
}