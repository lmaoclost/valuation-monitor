import type { FiiPapelCalculatedDataType } from "@/@types/FiiPapelCalculatedDataType";
import type { FiiPapelFormattedDataType } from "@/@types/FiiPapelFormattedDataType";
import { baseFiiFormatter } from "./baseFiiFormatter";

export const papelFormatter = (
  row: FiiPapelCalculatedDataType,
): FiiPapelFormattedDataType => {
  return {
    ...baseFiiFormatter(row as any),
    subcategoria: row.subcategoria,
  } as FiiPapelFormattedDataType;
};
