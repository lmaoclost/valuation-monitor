import { StatusInvestData } from "@/app/components/table";
import { calculateGordonFairPrice } from "./calculateGordonFairPrice";
import { convertStringToFloat } from "./convertStringToFloat";

export const calculateGordonDiscount = (value: StatusInvestData, risk: number) => {
  const gordonFairPrice = calculateGordonFairPrice(value, risk);
  const price = convertStringToFloat(value.PRECO);

  const discount = (gordonFairPrice - price) / gordonFairPrice;

  return discount * 100;
}