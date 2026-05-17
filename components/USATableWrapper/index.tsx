"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState, Suspense, useMemo } from "react";
import {
  getUSAStocksAndComplementary,
} from "@/app/actions/usaStock.actions";
import { DataTable } from "@/components/DataTable";
import { createUSAColumns } from "@/components/DataTable/usaColumns";
import { LoadingState, ErrorState } from "@/components/ui/states";
import { usaStocksPresets } from "@/constants/usaStocksPresets";
import { usaStocksColumnVisibility } from "@/constants";
import { USA_RISK_PREMIUM } from "@/lib/marketConfig";
import { useTranslations } from "next-intl";
import type { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";

export function USATableWrapper() {
  const [selectedPresets, setSelectedPresets] = useState<string[]>([]);
  const t = useTranslations("Columns");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["usa-stocks"],
    queryFn: async () => await getUSAStocksAndComplementary(),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const memoizedColumns = useMemo(() => createUSAColumns(t), [t]);
  const allStocks = useMemo(() => data?.stocks ?? [], [data?.stocks]);

  const filteredData = useMemo(() => {
    if (selectedPresets.length === 0) return allStocks;
    return allStocks.filter((item: StocksFormattedDataType) =>
      selectedPresets.every((key) => {
        const fn = usaStocksPresets[key as keyof typeof usaStocksPresets];
        return fn ? fn(item) : true;
      })
    );
  }, [allStocks, selectedPresets]);

  if (isLoading) return <LoadingState />;

  if (isError) return <ErrorState error={error as Error} />;

  return (
    <Suspense fallback={<LoadingState />}>
      <DataTable
        columns={memoizedColumns}
        data={filteredData}
        riskDisplay={(USA_RISK_PREMIUM * 100).toFixed(2) + "%"}
        selectedPresets={selectedPresets}
        onSelectedPresetsChange={setSelectedPresets}
        presets={usaStocksPresets}
        initialColumnVisibility={usaStocksColumnVisibility}
      />
    </Suspense>
  );
}
