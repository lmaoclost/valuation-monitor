import { StatusInvestData } from "@/app/components/table";
import { convertStringToFloat } from "./convertStringToFloat";
import { calculateGrahamFairPrice } from "./calculateGrahamFairPrice";

export const calculateGrahamDiscount = (value: StatusInvestData) => {
  const grahamFairPrice = calculateGrahamFairPrice(value);
  const price = convertStringToFloat(value.PRECO);

  const discount = (grahamFairPrice - price) / grahamFairPrice;
  return discount * 100;
}