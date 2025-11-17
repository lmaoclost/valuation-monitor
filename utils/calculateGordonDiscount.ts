import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";
import { calculateGordonFairPrice } from "./calculateGordonFairPrice";
import { convertStringToFloat } from "./convertStringToFloat";

export const calculateGordonDiscount = (
  value: StatusInvestDataType,
  risk: number,
) => {
  const gordonFairPrice = calculateGordonFairPrice(value, risk);
  const price = convertStringToFloat(value.PRECO);

  const discount = (gordonFairPrice - price) / gordonFairPrice;

  return discount;
};
