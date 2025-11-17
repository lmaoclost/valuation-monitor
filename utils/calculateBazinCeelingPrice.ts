import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";
import { calculateBazinFairPrice } from "./calculateBazinFairPrice";

export const calculateBazinCeelingPrice = (value: StatusInvestDataType) => {
  const bazinFairPrice = calculateBazinFairPrice(value);
  const discountMargin = 0.3;

  const ceelingPrice = bazinFairPrice / (1 + discountMargin);
  return ceelingPrice;
};
