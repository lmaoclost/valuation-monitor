import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";
import { calculateBazinFairPrice } from "./calculateBazinFairPrice";

export const calculateBazinDiscount = (
  value: StatusInvestNormalizedDataType,
  rate: number = 0.06,
) => {
  const bazinFairPrice = calculateBazinFairPrice(value, rate);
  const price = value.PRECO;

  const discount = (bazinFairPrice - price) / bazinFairPrice;
  return discount;
};
