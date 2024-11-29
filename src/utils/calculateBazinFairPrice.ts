import { StatusInvestData } from "@/app/components/table";
import { calculateDPA } from "./calculateDPA";

export const calculateBazinFairPrice = (value: StatusInvestData) => {
  const dpa = calculateDPA(value);
  const fairPrice = dpa / 6 * 100;

  return fairPrice;
}