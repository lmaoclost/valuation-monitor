import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";
import { calculateGordonFairPrice } from "./calculateGordonFairPrice";

export const calculateGordonDiscount = (
  value: StatusInvestNormalizedDataType,
  risk: number,
) => {
  const gordonFairPrice = calculateGordonFairPrice(value, risk);
  const price = value.PRECO;

  const discount = (gordonFairPrice - price) / gordonFairPrice;

  return discount;
};
