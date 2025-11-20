import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";
import { calculateBazinFairPrice } from "./calculateBazinFairPrice";
import { getDiscountMargin } from "./getDiscountMargin";

export const calculateBazinCeelingPrice = (
  value: StatusInvestNormalizedDataType,
) => {
  const bazinFairPrice = calculateBazinFairPrice(value);
  const discountMargin = getDiscountMargin();

  const ceelingPrice = bazinFairPrice / (1 + discountMargin);
  return ceelingPrice;
};
