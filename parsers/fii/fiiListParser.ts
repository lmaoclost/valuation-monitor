import { StatusInvestFiiSchema } from "./tijoloSchema";
import { fiiListDomain } from "./fiiListDomain";
import { fiiListFormatter } from "./fiiListFormatter";
import { brazilianFIIManager } from "@/constants/brazilianFIIManager";
import type { FiiListFormattedDataType } from "@/@types/FiiListFormattedDataType";
import { z } from "zod";

export const fiiListParser = (
  data: z.infer<typeof StatusInvestFiiSchema>,
  typeFilter: string,
): FiiListFormattedDataType[] => {
  return data
    .filter((row) => brazilianFIIManager[row.TICKER]?.type === typeFilter)
    .map(fiiListDomain)
    .map(fiiListFormatter);
};
