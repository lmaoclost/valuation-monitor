import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getFiiListData } from "@/services";
import {
  ApiFilterError,
  FII_LIST_COLUMN_TYPES,
  applyTableFilter,
} from "@/lib/api-filter";

export async function GET(request?: NextRequest) {
  try {
    const data = await getFiiListData("agronegócio");
    const searchParams =
      request?.nextUrl.searchParams ?? new URLSearchParams();
    return NextResponse.json(
      applyTableFilter(data, searchParams, FII_LIST_COLUMN_TYPES),
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
    console.error("Error processing FII Fiagro Data:", error);
    return NextResponse.json(
      { error: "Error processing FII Fiagro Data" },
      { status: 500 },
    );
  }
}
