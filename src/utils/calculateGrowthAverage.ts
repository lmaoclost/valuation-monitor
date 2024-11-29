import { StatusInvestData } from "@/app/components/table";
import { Row } from "@tanstack/react-table";
import { calculateDamoradanGrowth } from "./calculateDamodaramGrowth";
import { calculateCagrProfit } from "./calculateCagrProfit";

export const calculateGrowthAverage = (value: StatusInvestData) => {
  const cagr = calculateCagrProfit(value);
  const damodaranGrowth = calculateDamoradanGrowth(value);

  return (cagr + damodaranGrowth) / 2;
}