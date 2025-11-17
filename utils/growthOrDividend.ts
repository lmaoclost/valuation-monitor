import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";
import { calculatePayout } from "./calculatePayout";

export const growthOrDividend = (value: StatusInvestDataType) => {
  const payout = calculatePayout(value);
  switch (true) {
    case payout <= 40:
      return "Crescimento";
    case payout <= 60:
      return "Indefinido";
    default:
      return "Dividendos";
  }
};
