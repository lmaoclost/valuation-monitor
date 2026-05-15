import { fiiTijoloPresets, fiiPapelPresets, fiiFiagroPresets, fiiFiInfraPresets, fiiFofPresets } from "@/constants/fiiPresets";
import { getFiiTijoloData, getFiiPapelData, getFiiListData } from "@/services";
import { NextRequest, NextResponse } from "next/server";

const PRESETS_MAP: Record<string, { presets: Record<string, null | ((item: any) => boolean)>; fetcher: () => Promise<any[]> }> = {
  tijolo: { presets: fiiTijoloPresets, fetcher: () => getFiiTijoloData() },
  papel: { presets: fiiPapelPresets, fetcher: () => getFiiPapelData() },
  "agronegócio": { presets: fiiFiagroPresets, fetcher: () => getFiiListData("agronegócio") },
  "recebíveis de infraestrutura": { presets: fiiFiInfraPresets, fetcher: () => getFiiListData("recebíveis de infraestrutura") },
  "fundo de fundos": { presets: fiiFofPresets, fetcher: () => getFiiListData("fundo de fundos") },
};

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type");
  const preset = req.nextUrl.searchParams.get("preset");

  if (!preset) {
    return NextResponse.json({ error: "Preset obrigatório" }, { status: 400 });
  }

  const config = type ? PRESETS_MAP[type] : undefined;
  if (!config) {
    return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
  }

  const dataArray = await config.fetcher();
  const filterFn = config.presets[preset];

  return NextResponse.json(filterFn ? dataArray.filter(filterFn) : dataArray);
}
