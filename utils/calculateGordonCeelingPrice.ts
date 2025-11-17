import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";
import { calculateGordonFairPrice } from "./calculateGordonFairPrice";

export const calculateGordonCeelingPrice = (
  value: StatusInvestData,
  risk: number,
) => {
  const bazinFairPrice = calculateGordonFairPrice(value, risk);
  const discountMargin = 0.3;

  const ceelingPrice = bazinFairPrice / (1 + discountMargin);
  return ceelingPrice;
};
