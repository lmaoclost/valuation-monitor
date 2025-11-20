import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";
import { calculateDPA } from "./calculateDPA";

export const calculateBazinFairPrice = (
  value: StatusInvestNormalizedDataType,
) => {
  const dpa = calculateDPA(value);
  const fairPrice = dpa / 0.06;

  return fairPrice;
};
