import { fiiTijoloPresets, fiiPapelPresets } from "@/constants/fiiPresets";
import { getFiiTijoloData, getFiiPapelData } from "@/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const type = searchParams.get("type");
  const preset = searchParams.get("preset");

  if (!preset) {
    return NextResponse.json({ error: "Preset obrigatório" }, { status: 400 });
  }

  const dataArray = type === "papel" ? await getFiiPapelData() : await getFiiTijoloData();
  const presets: Record<string, null | ((item: any) => boolean)> =
    type === "papel" ? fiiPapelPresets : fiiTijoloPresets;
  const filterFn = presets[preset];

  return NextResponse.json(filterFn ? dataArray.filter(filterFn) : dataArray);
}
