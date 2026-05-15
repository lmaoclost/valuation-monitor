import type { FiiTijoloFormattedDataType } from "@/@types/FiiTijoloFormattedDataType";
import type { FiiPapelFormattedDataType } from "@/@types/FiiPapelFormattedDataType";

export type FiiTijoloPresetKey = "Limpar" | "Top Gestores";

export const fiiTijoloPresets: Record<
  FiiTijoloPresetKey,
  null | ((item: FiiTijoloFormattedDataType) => boolean)
> = {
  Limpar: null,
  "Top Gestores": (i) => i.isTopManager === "SIM",
};

export type FiiPapelPresetKey = "Limpar" | "Top Gestores";

export const fiiPapelPresets: Record<
  FiiPapelPresetKey,
  null | ((item: FiiPapelFormattedDataType) => boolean)
> = {
  Limpar: null,
  "Top Gestores": (i) => i.isTopManager === "SIM",
};
