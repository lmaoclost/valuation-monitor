import { NextResponse, connection } from "next/server";
import type { NextRequest } from "next/server";
import { getFiiTijoloData, getFiiPapelData } from "@/services";
import {
  FII_PAPEL_COLUMN_TYPES,
  FII_TIJOLO_COLUMN_TYPES,
  applyTableFilterLenient,
} from "@/lib/api-filter";

export async function GET(request?: NextRequest) {
  try {
    await connection();
    const [tijolo, papel] = await Promise.all([
      getFiiTijoloData(),
      getFiiPapelData(),
    ]);
    const searchParams =
      request?.nextUrl.searchParams ?? new URLSearchParams();
    return NextResponse.json({
      tijolo: applyTableFilterLenient(
        tijolo,
        searchParams,
        FII_TIJOLO_COLUMN_TYPES,
      ),
      papel: applyTableFilterLenient(
        papel,
        searchParams,
        FII_PAPEL_COLUMN_TYPES,
      ),
    });
  } catch (error) {
    console.error("Error processing FII Data:", error);
    return NextResponse.json(
      { error: "Error processing FII Data" },
      { status: 500 },
    );
  }
}
