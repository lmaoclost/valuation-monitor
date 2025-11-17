import { convertStringToFloat } from "@/utils/convertStringToFloat";
import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";

export const calculateGrahamFairPrice = (value: StatusInvestDataType) => {
  const lpa = value[" LPA"];
  const vpa = value[" VPA"];
  const formattedLPA = convertStringToFloat(lpa);
  const formattedVPA = convertStringToFloat(vpa);
  const fairPrice = Math.sqrt(22.5 * formattedLPA * formattedVPA);

  return fairPrice;
};
