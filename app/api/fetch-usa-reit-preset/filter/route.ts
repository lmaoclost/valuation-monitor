import { usaStocksPresets } from "@/constants/usaStocksPresets";
import { getUSAReitData } from "@/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const preset = searchParams.get("preset");

  if (!preset) {
    return NextResponse.json({ error: "Preset obrigatório" }, { status: 400 });
  }

  const allData = await getUSAReitData();
  const filterFn = usaStocksPresets[preset as keyof typeof usaStocksPresets];

  return NextResponse.json(filterFn ? allData.filter(filterFn) : allData);
}