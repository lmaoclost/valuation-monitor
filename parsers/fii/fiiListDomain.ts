import type { FiiCSVRow } from "./tijoloSchema";
import type { FiiListCalculatedDataType } from "@/@types/FiiListCalculatedDataType";
import { baseFiiDomain } from "./baseFiiDomain";

export const fiiListDomain = (
  row: FiiCSVRow,
): FiiListCalculatedDataType => {
  return baseFiiDomain(row) as FiiListCalculatedDataType;
};
