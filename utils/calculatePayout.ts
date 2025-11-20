import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";
import { calculateDPA } from "./calculateDPA";

export const calculatePayout = (value: StatusInvestNormalizedDataType) => {
  const dpa = calculateDPA(value);
  const lpa = value[" LPA"];
  const payout = dpa / lpa;

  return payout ? payout : 0;
};
