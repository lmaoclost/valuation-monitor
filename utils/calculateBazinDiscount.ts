import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";
import { calculateBazinFairPrice } from "./calculateBazinFairPrice";
import { convertStringToFloat } from "./convertStringToFloat";

export const calculateBazinDiscount = (value: StatusInvestDataType) => {
  const bazinFairPrice = calculateBazinFairPrice(value);
  const price = convertStringToFloat(value.PRECO);

  const discount = (bazinFairPrice - price) / bazinFairPrice;
  return discount;
};
