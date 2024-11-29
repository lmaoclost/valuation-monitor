import { convertStringToFloat } from '@/utils/convertStringToFloat';
import { StatusInvestData } from "@/app/components/table";
import { calculateGrowthAverage } from "./calculateGrowthAverage";

export const calculatePEG = (value: StatusInvestData) => {
  const pl = convertStringToFloat(value['P/L']) as number;
  const growthAverage = calculateGrowthAverage(value);

  return pl / growthAverage;
}