import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";
import { calculateGrahamFairPrice } from "./calculateGrahamFairPrice";

export const calculateGrahamCeelingPrice = (value: StatusInvestDataType) => {
  const grahamFairPrice = calculateGrahamFairPrice(value);
  const discountMargin = 0.3;

  const ceelingPrice = grahamFairPrice / (1 + discountMargin);
  return ceelingPrice;
};
