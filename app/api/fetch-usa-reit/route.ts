import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUSAReitData } from "@/services";
import {
  ApiFilterError,
  USA_REIT_COLUMN_TYPES,
  applyTableFilter,
} from "@/lib/api-filter";

export async function GET(request?: NextRequest) {
  try {
    const parsedData = await getUSAReitData();
    const searchParams =
      request?.nextUrl.searchParams ?? new URLSearchParams();

    return NextResponse.json(
      applyTableFilter(parsedData, searchParams, USA_REIT_COLUMN_TYPES),
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
    console.error("Error processing USA REIT Data:", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: "Error processing USA REIT Data" },
      { status: 500 },
    );
  }
}
