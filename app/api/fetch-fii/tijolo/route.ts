import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getFiiTijoloData } from "@/services";
import {
  ApiFilterError,
  FII_TIJOLO_COLUMN_TYPES,
  applyTableFilter,
} from "@/lib/api-filter";

export async function GET(request?: NextRequest) {
  try {
    const data = await getFiiTijoloData();
    const searchParams =
      request?.nextUrl.searchParams ?? new URLSearchParams();
    return NextResponse.json(
      applyTableFilter(data, searchParams, FII_TIJOLO_COLUMN_TYPES),
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
    console.error("Error processing FII Tijolo Data:", error);
    return NextResponse.json(
      { error: "Error processing FII Tijolo Data" },
      { status: 500 },
    );
  }
}
