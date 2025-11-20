import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";
import { calculateDamoradanGrowth } from "./calculateDamodaramGrowth";
import { calculateCagrProfit } from "./calculateCagrProfit";

export const calculateGrowthAverage = (
  value: StatusInvestNormalizedDataType,
) => {
  const cagr = calculateCagrProfit(value);
  const damodaranGrowth = calculateDamoradanGrowth(value);

  return (cagr + damodaranGrowth) / 2;
};
