import { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";
import { getStocksData } from "@/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const preset = req.nextUrl.searchParams.get("preset");

  if (!preset) {
    return NextResponse.json({ error: "Preset obrigatório" }, { status: 400 });
  }

  const allData = await getStocksData();

  if (preset === "Limpar") {
    return NextResponse.json(allData);
  }

  const filteredData = allData.filter(
    (item: StocksFormattedDataType) => item.segmentname === preset,
  );

  return NextResponse.json(filteredData);
}
