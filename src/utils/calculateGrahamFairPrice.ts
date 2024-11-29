import { convertStringToFloat } from '@/utils/convertStringToFloat';
import { StatusInvestData } from "@/app/components/table";

export const calculateGrahamFairPrice = (value: StatusInvestData) => {
  const lpa = value[" LPA"];
  const vpa = value[" VPA"];
  const formattedLPA = convertStringToFloat(lpa);
  const formattedVPA = convertStringToFloat(vpa);
  const fairPrice = Math.sqrt(22.5 * formattedLPA * formattedVPA);

  return fairPrice;
}