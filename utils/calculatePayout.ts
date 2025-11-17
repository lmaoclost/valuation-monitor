import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";
import { calculateDPA } from "./calculateDPA";
import { convertStringToFloat } from "./convertStringToFloat";

export const calculatePayout = (value: StatusInvestDataType) => {
  const dpa = calculateDPA(value);
  const lpa = value[" LPA"];
  const formattedLPA = convertStringToFloat(lpa);
  const payout = dpa / formattedLPA;

  return payout ? payout : 0;
};
