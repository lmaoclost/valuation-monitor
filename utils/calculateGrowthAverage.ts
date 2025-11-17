import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";
import { calculateDamoradanGrowth } from "./calculateDamodaramGrowth";
import { calculateCagrProfit } from "./calculateCagrProfit";

export const calculateGrowthAverage = (value: StatusInvestDataType) => {
  const cagr = calculateCagrProfit(value);
  const damodaranGrowth = calculateDamoradanGrowth(value);

  return (cagr + damodaranGrowth) / 2;
};
