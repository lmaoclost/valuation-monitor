import { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";

export type PresetKey =
  | "Limpar"
  | "Bancos"
  | "Energia elétrica"
  | "Água e saneamento"
  | "Seguradoras"
  | "Cíclico"
  | "Não Cíclico";

export const stocksPresets: Record<
  PresetKey,
  null | ((item: StocksFormattedDataType) => boolean)
> = {
  Limpar: null,
  Bancos: (i) => i.segmentname === "Bancos",
  "Energia elétrica": (i) => i.segmentname === "Energia elétrica",
  "Água e saneamento": (i) => i.segmentname === "Água e saneamento",
  Seguradoras: (i) => i.segmentname === "Seguradoras",
  Cíclico: (i) => i.cicle === "SIM",
  "Não Cíclico": (i) => i.cicle === "NÃO",
};
