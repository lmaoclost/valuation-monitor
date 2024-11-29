import { StatusInvestData } from "@/app/components/table";
import { calculateGrahamFairPrice } from "./calculateGrahamFairPrice";

export const calculateGrahamCeelingPrice = (value: StatusInvestData) => {
  const grahamFairPrice = calculateGrahamFairPrice(value);
  const discountMargin = 0.3;

  const ceelingPrice = grahamFairPrice / (1 + discountMargin);
  return ceelingPrice;
}