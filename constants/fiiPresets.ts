import type { FiiTijoloFormattedDataType } from "@/@types/FiiTijoloFormattedDataType";
import type { FiiPapelFormattedDataType } from "@/@types/FiiPapelFormattedDataType";
import type { FiiListFormattedDataType } from "@/@types/FiiListFormattedDataType";

export type FiiTijoloPresetKey =
  | "Limpar"
  | "Top Gestores"
  | "Lajes Comerciais"
  | "Shopping/Varejo"
  | "Logisticos"
  | "Agronegócio";

export const fiiTijoloPresets: Record<
  FiiTijoloPresetKey,
  null | ((item: FiiTijoloFormattedDataType) => boolean)
> = {
  Limpar: null,
  "Top Gestores": (i) => i.isTopManager === "SIM",
  "Lajes Comerciais": (i) => i.category === "Lajes Comerciais",
  "Shopping/Varejo": (i) => i.category === "Shopping/Varejo",
  Logisticos: (i) => i.category === "Logisticos",
  "Agronegócio": (i) => i.category === "Agronegócio",
};

export type FiiPapelPresetKey =
  | "Limpar"
  | "Top Gestores"
  | "Recebiveis >50% IPCA"
  | "Recebiveis >50% CDI"
  | "Recebiveis Outros";

export const fiiPapelPresets: Record<
  FiiPapelPresetKey,
  null | ((item: FiiPapelFormattedDataType) => boolean)
> = {
  Limpar: null,
  "Top Gestores": (i) => i.isTopManager === "SIM",
  "Recebiveis >50% IPCA": (i) => i.subcategoria === "Recebiveis >50% IPCA",
  "Recebiveis >50% CDI": (i) => i.subcategoria === "Recebiveis >50% CDI",
  "Recebiveis Outros": (i) => i.subcategoria === "Recebiveis Outros",
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
