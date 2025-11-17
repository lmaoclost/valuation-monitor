import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";
import { convertStringToFloat } from "./convertStringToFloat";
import { calculateGrahamFairPrice } from "./calculateGrahamFairPrice";

export const calculateGrahamDiscount = (value: StatusInvestDataType) => {
  const grahamFairPrice = calculateGrahamFairPrice(value);
  const price = convertStringToFloat(value.PRECO);

  const discount = (grahamFairPrice - price) / grahamFairPrice;
  return discount;
};
