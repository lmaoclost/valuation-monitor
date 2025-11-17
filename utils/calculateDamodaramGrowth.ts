import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";
import { calculatePayout } from "./calculatePayout";
import { convertStringToFloat } from "./convertStringToFloat";

export const calculateDamoradanGrowth = (value: StatusInvestDataType) => {
  const payout = calculatePayout(value);
  const roe = value.ROE;
  const formattedROE = convertStringToFloat(roe);

  return (1 - payout / 100) * formattedROE;
};
