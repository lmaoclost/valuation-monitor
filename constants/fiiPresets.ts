import type { FiiTijoloFormattedDataType } from "@/@types/FiiTijoloFormattedDataType";
import type { FiiPapelFormattedDataType } from "@/@types/FiiPapelFormattedDataType";
import type { FiiListFormattedDataType } from "@/@types/FiiListFormattedDataType";

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

export type FiiListPresetKey = "Limpar" | "Top Gestores";

export const fiiFiagroPresets: Record<
  FiiListPresetKey,
  null | ((item: FiiListFormattedDataType) => boolean)
> = {
  Limpar: null,
  "Top Gestores": (i) => i.isTopManager === "SIM",
};

export const fiiFiInfraPresets: Record<
  FiiListPresetKey,
  null | ((item: FiiListFormattedDataType) => boolean)
> = {
  Limpar: null,
  "Top Gestores": (i) => i.isTopManager === "SIM",
};

export const fiiFofPresets: Record<
  FiiListPresetKey,
  null | ((item: FiiListFormattedDataType) => boolean)
> = {
  Limpar: null,
  "Top Gestores": (i) => i.isTopManager === "SIM",
};
