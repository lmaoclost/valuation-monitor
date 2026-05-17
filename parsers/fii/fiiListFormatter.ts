import type { FiiListCalculatedDataType } from "@/@types/FiiListCalculatedDataType";
import type { FiiListFormattedDataType } from "@/@types/FiiListFormattedDataType";
import { baseFiiFormatter } from "./baseFiiFormatter";

export const fiiListFormatter = (
  row: FiiListCalculatedDataType,
): FiiListFormattedDataType => {
  return baseFiiFormatter(row as any) as FiiListFormattedDataType;
};
