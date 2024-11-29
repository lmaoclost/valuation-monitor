import { StatusInvestData } from "@/app/components/table";
import { calculateBazinFairPrice } from "./calculateBazinFairPrice";

export const calculateBazinCeelingPrice = (value: StatusInvestData) => {
  const bazinFairPrice = calculateBazinFairPrice(value);
  const discountMargin = 0.3;

  const ceelingPrice = bazinFairPrice / (1 + discountMargin);
  return ceelingPrice;
}