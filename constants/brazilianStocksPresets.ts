import { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";

export type PresetKey =
  | "Limpar"
  | "Bancos"
  | "Energia elétrica"
  | "Água e saneamento"
  | "Seguradoras"
  | "Cíclico"
  | "Não Cíclico"
  | "Bazin Green"
  | "Graham Green"
  | "Gordon Green";

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
  "Bazin Green": (i) => i.bazinDiscountColor === "text-green-600" && i.bazinDiscount !== "",
  "Graham Green": (i) => i.grahamDiscountColor === "text-green-600" && i.grahamDiscount !== "",
  "Gordon Green": (i) => i.gordonDiscountColor === "text-green-600" && i.gordonDiscount !== "",
};
