import { StatusInvestDataType } from "@/components/DataTable/StatusInvestData.types";
import { convertStringToFloat } from "./convertStringToFloat";

export const getPL = (value: StatusInvestDataType) => {
  const pl = value["P/L"];
  const convertedPL = convertStringToFloat(pl);

  return convertedPL;
};
