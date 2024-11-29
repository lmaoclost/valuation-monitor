import { StatusInvestData } from "@/app/components/table";
import { calculatePayout } from "./calculatePayout";

export const growthOrDividend = (value: StatusInvestData) => {
  const payout = calculatePayout(value);
  switch (true) {
    case payout <= 40:
      return 'Crescimento'
    case payout <= 60:
      return 'Indefinido'
    default:
      return 'Dividendos'
  }
}