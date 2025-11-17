import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";
import { convertStringToFloat } from "./convertStringToFloat";

export const getPSR = (value: StatusInvestDataType) => {
  const psr = value["PSR"];
  const convertedPSR = convertStringToFloat(psr);

  return convertedPSR;
};
