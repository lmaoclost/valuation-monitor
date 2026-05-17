import { z } from "zod";
import { toNumber, toPercentage } from "@/parsers/shared/transforms";

export const FundamentusFiiSchema = z.array(
  z.object({
    Papel: z.string(),
    Segmento: z.string(),
    Cotação: toNumber,
    "FFO Yield": toPercentage,
    "Dividend Yield": toPercentage,
    "P/VP": toNumber,
    "Valor de Mercado": toNumber,
    Liquidez: toNumber,
    "Qtd de imóveis": toNumber,
    "Preço do m2": toNumber,
    "Aluguel por m2": toNumber,
    "Cap Rate": toPercentage,
    "Vacância Média": toPercentage,
  }),
);

export type FundamentusFiiNormalizedType = z.infer<typeof FundamentusFiiSchema>;
const FundamentusFiiRowSchema = FundamentusFiiSchema.element;
export type FundamentusRow = z.infer<typeof FundamentusFiiRowSchema>;
