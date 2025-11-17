import { convertStringToFloat } from "./convertStringToFloat";
import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";
import { getDY } from "./getDY";

export const calculateDPA = (value: StatusInvestDataType) => {
  const dy = getDY(value);
  const price = convertStringToFloat(value.PRECO);
  const dpa = (price * dy) / 100;

  return dpa;
};
