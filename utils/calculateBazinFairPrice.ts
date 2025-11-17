import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";
import { calculateDPA } from "./calculateDPA";

export const calculateBazinFairPrice = (value: StatusInvestDataType) => {
  const dpa = calculateDPA(value);
  const fairPrice = (dpa / 6) * 100;

  return fairPrice;
};
