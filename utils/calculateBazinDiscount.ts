import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";
import { calculateBazinFairPrice } from "./calculateBazinFairPrice";

export const calculateBazinDiscount = (
  value: StatusInvestNormalizedDataType,
) => {
  const bazinFairPrice = calculateBazinFairPrice(value);
  const price = value.PRECO;

  const discount = (bazinFairPrice - price) / bazinFairPrice;
  return discount;
};
