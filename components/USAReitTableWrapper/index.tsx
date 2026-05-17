"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState, Suspense, useMemo } from "react";
import {
  getUSAReitAndComplementary,
} from "@/app/actions/usaReit.actions";
import { DataTable } from "@/components/DataTable";
import { createUSAReitColumns } from "@/components/DataTable/usaReitColumns";
import { LoadingState, ErrorState } from "@/components/ui/states";
import { usaReitPresets } from "@/constants/usaReitsPresets";
import { usaReitsColumnVisibility } from "@/constants";
import { USA_REIT_RISK_PREMIUM } from "@/lib/marketConfig";
import { useTranslations } from "next-intl";
import type { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";

export function USAReitTableWrapper() {
  const [selectedPresets, setSelectedPresets] = useState<string[]>([]);
  const t = useTranslations("Columns");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["usa-reit"],
    queryFn: async () => await getUSAReitAndComplementary(),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const memoizedColumns = useMemo(() => createUSAReitColumns(t), [t]);
  const allStocks = useMemo(() => data?.stocks ?? [], [data?.stocks]);

  const filteredData = useMemo(() => {
    if (selectedPresets.length === 0) return allStocks;
    return allStocks.filter((item: StocksFormattedDataType) =>
      selectedPresets.every((key) => {
        const fn = usaReitPresets[key as keyof typeof usaReitPresets];
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
        riskDisplay={(USA_REIT_RISK_PREMIUM * 100).toFixed(2) + "%"}
        selectedPresets={selectedPresets}
        onSelectedPresetsChange={setSelectedPresets}
        presets={usaReitPresets}
        initialColumnVisibility={usaReitsColumnVisibility}
      />
    </Suspense>
  );
}
