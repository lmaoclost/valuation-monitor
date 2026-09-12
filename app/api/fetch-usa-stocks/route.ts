import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUSAStocksData } from "@/services";
import {
  ApiFilterError,
  USA_STOCK_COLUMN_TYPES,
  applyTableFilter,
} from "@/lib/api-filter";

export async function GET(request?: NextRequest) {
  try {
    const parsedData = await getUSAStocksData();
    const searchParams =
      request?.nextUrl.searchParams ?? new URLSearchParams();

    return NextResponse.json(
      applyTableFilter(parsedData, searchParams, USA_STOCK_COLUMN_TYPES),
    );
  } catch (error) {
    if (error instanceof ApiFilterError) {
      return NextResponse.json(
        {
          error: error.message,
          allowedColumns: error.allowedColumns,
        },
        { status: 400 },
      );
    }
    console.error("Error processing USA Data:", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: "Error processing USA Data" },
      { status: 500 },
    );
  }
}
