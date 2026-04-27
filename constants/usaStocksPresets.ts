import { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";

export type USAPresetKey = "Limpar" | "Discounted" | "Discounted PEG";

export const usaStocksPresets: Record<
  USAPresetKey,
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
};
