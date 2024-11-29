import { StatusInvestData } from "@/app/components/table";
import { calculateBazinFairPrice } from "./calculateBazinFairPrice";
import { convertStringToFloat } from "./convertStringToFloat";

export const calculateBazinDiscount = (value: StatusInvestData) => {
  const bazinFairPrice = calculateBazinFairPrice(value);
  const price = convertStringToFloat(value.PRECO);

  const discount = (bazinFairPrice - price) / bazinFairPrice;
  return discount * 100;
}