import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";
import { calculateBazinFairPrice } from "./calculateBazinFairPrice";
import { getDiscountMargin } from "./getDiscountMargin";

export const calculateBazinCeelingPrice = (
  value: StatusInvestNormalizedDataType,
  rate: number = 0.06,
) => {
  const bazinFairPrice = calculateBazinFairPrice(value, rate);
  const discountMargin = getDiscountMargin();

  const ceelingPrice = bazinFairPrice / (1 + discountMargin);
  return ceelingPrice;
};
