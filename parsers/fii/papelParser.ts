import { StatusInvestFiiSchema } from "./tijoloSchema";
import { papelDomain } from "./papelDomain";
import { papelFormatter } from "./papelFormatter";
import { brazilianFIIManager } from "@/constants/brazilianFIIManager";
import type { FiiPapelFormattedDataType } from "@/@types/FiiPapelFormattedDataType";
import { z } from "zod";

export const papelParser = async (
  data: z.infer<typeof StatusInvestFiiSchema>,
): Promise<FiiPapelFormattedDataType[]> => {
  return data
    .filter((row) => brazilianFIIManager[row.TICKER]?.type === "papel")
    .map(papelDomain)
    .map(papelFormatter);
};
