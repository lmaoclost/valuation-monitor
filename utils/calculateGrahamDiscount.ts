import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";
import { calculateGrahamFairPrice } from "./calculateGrahamFairPrice";

export const calculateGrahamDiscount = (
  value: StatusInvestNormalizedDataType,
) => {
  const grahamFairPrice = calculateGrahamFairPrice(value);
  const price = value.PRECO;

  const discount = (grahamFairPrice - price) / grahamFairPrice;
  return discount;
};
