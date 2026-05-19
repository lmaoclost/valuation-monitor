import { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";

export type USAReitsPresetKey = "Limpar" | "Discounted" | "Discounted PEG" | "Bazin Green" | "Graham Green" | "Gordon Green";

export const usaReitPresets: Record<
  USAReitsPresetKey,
  null | ((item: StocksFormattedDataType) => boolean)
> = {
  Limpar: null,
  Discounted: (i) =>
    i.bazinDiscountColor === "text-green-600" &&
    i.bazinDiscount !== "" &&
    i.grahamDiscountColor === "text-green-600" &&
    i.grahamDiscount !== "" &&
    i.gordonDiscountColor === "text-green-600" &&
    i.gordonDiscount !== "",
  "Discounted PEG": (i) =>
    i.bazinDiscountColor === "text-green-600" &&
    i.bazinDiscount !== "" &&
    i.grahamDiscountColor === "text-green-600" &&
    i.grahamDiscount !== "" &&
    i.gordonDiscountColor === "text-green-600" &&
    i.gordonDiscount !== "" &&
    i.pegColor === "text-green-600",
  "Bazin Green": (i) => i.bazinDiscountColor === "text-green-600" && i.bazinDiscount !== "",
  "Graham Green": (i) => i.grahamDiscountColor === "text-green-600" && i.grahamDiscount !== "",
  "Gordon Green": (i) => i.gordonDiscountColor === "text-green-600" && i.gordonDiscount !== "",
};
