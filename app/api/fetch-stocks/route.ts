import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getStocksData } from "@/services";
import {
  ApiFilterError,
  STOCK_COLUMN_TYPES,
  applyTableFilter,
} from "@/lib/api-filter";

export async function GET(request?: NextRequest) {
  try {
    const parsedData = await getStocksData();
    const searchParams =
      request?.nextUrl.searchParams ?? new URLSearchParams();

    return NextResponse.json(
      applyTableFilter(parsedData, searchParams, STOCK_COLUMN_TYPES),
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
    console.error("Error processing Data:", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: "Error processing Data" },
      { status: 500 },
    );
  }
}
