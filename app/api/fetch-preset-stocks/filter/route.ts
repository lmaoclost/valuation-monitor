import { PresetKey, stocksPresets } from "@/constants/stocksPresets";
import { getStocksData } from "@/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const preset = req.nextUrl.searchParams.get("preset") as PresetKey;

  if (!preset)
    return NextResponse.json({ error: "Preset obrigatório" }, { status: 400 });

  const allData = await getStocksData();
  const filterFn = stocksPresets[preset];

  return NextResponse.json(filterFn ? allData.filter(filterFn) : allData);
}
