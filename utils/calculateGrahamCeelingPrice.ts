import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";
import { calculateGrahamFairPrice } from "./calculateGrahamFairPrice";
import { getDiscountMargin } from "./getDiscountMargin";

export const calculateGrahamCeelingPrice = (
  value: StatusInvestNormalizedDataType,
) => {
  const grahamFairPrice = calculateGrahamFairPrice(value);
  const discountMargin = getDiscountMargin();

  const ceelingPrice = grahamFairPrice / (1 + discountMargin);

  return ceelingPrice;
};
