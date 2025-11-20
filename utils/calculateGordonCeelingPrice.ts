import { StatusInvestNormalizedDataType } from "@/@types/StatusInvestNormalizedDataType";
import { calculateGordonFairPrice } from "./calculateGordonFairPrice";
import { getDiscountMargin } from "./getDiscountMargin";

export const calculateGordonCeelingPrice = (
  value: StatusInvestNormalizedDataType,
  risk: number,
) => {
  const bazinFairPrice = calculateGordonFairPrice(value, risk);
  const discountMargin = getDiscountMargin();

  const ceelingPrice = bazinFairPrice / (1 + discountMargin);
  return ceelingPrice;
};
