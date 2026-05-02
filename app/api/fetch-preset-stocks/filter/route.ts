import { stocksPresets } from "@/constants/brazilianStocksPresets";
import { getStocksData } from "@/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const preset = searchParams.get("preset");

  if (!preset) {
    return NextResponse.json({ error: "Preset obrigatório" }, { status: 400 });
  }

  const allData = await getStocksData();
  const filterFn = stocksPresets[preset as keyof typeof stocksPresets];

  return NextResponse.json(filterFn ? allData.filter(filterFn) : allData);
}
