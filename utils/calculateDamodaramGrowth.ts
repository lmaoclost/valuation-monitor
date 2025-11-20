import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";
import { calculatePayout } from "./calculatePayout";

export const calculateDamoradanGrowth = (
  value: StatusInvestNormalizedDataType,
) => {
  const payout = calculatePayout(value);
  const roe = value.ROE;

  return (1 - payout) * roe;
};
