import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";
import { calculatePayout } from "./calculatePayout";

export const growthOrDividend = (value: StatusInvestNormalizedDataType) => {
  const payout = calculatePayout(value);
  switch (true) {
    case payout <= 0.4:
      return "Crescimento";
    case payout <= 0.6:
      return "Indefinido";
    default:
      return "Dividendos";
  }
};
