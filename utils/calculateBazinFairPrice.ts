import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";
import { calculateDPA } from "./calculateDPA";

export const calculateBazinFairPrice = (
  value: StatusInvestNormalizedDataType,
  rate: number = 0.06,
) => {
  const dpa = calculateDPA(value);
  const fairPrice = dpa / rate;

  return fairPrice;
};
