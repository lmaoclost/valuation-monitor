import { convertStringToFloat } from "@/utils/convertStringToFloat";
import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";
import { calculateGrowthAverage } from "./calculateGrowthAverage";
import { getPL } from "./getPL";

export const calculatePEG = (value: StatusInvestDataType) => {
  const pl = getPL(value);
  const growthAverage = calculateGrowthAverage(value);

  return pl / growthAverage;
};
