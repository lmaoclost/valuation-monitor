import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";
import { convertStringToFloat } from "./convertStringToFloat";
import { formatPercentage } from "./formatPercentage";

export const getPL = (value: StatusInvestDataType) => {
  const pl = value["P/L"];
  const convertedPL = convertStringToFloat(pl);

  return formatPercentage(convertedPL / 100);
};
