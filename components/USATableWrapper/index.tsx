"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { Suspense } from "react";
import {
  getUSAStocksAndComplementary,
  getUSAStocksPreset,
} from "@/app/actions/usaStock.actions";
import { DataTable } from "@/components/DataTable";
import { createUSAColumns } from "@/components/DataTable/usaColumns";
import { LoadingState, ErrorState } from "@/components/ui/states";
import { useMemo, useCallback, useEffect } from "react";
import { usaStocksPresets } from "@/constants/usaStocksPresets";
import { usaStocksColumnVisibility } from "@/constants";
import { USA_RISK_PREMIUM } from "@/lib/marketConfig";

export function USATableWrapper() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["usa-stocks"],
    queryFn: async () => await getUSAStocksAndComplementary(),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    const presets = ["Discounted", "Discounted PEG"];
    presets.forEach((preset) => {
      queryClient.prefetchQuery({
        queryKey: ["usa-preset-stocks", preset],
        queryFn: () => getUSAStocksPreset(preset),
        staleTime: 24 * 60 * 60 * 1000,
      });
    });
  }, [queryClient]);

  const { mutateAsync: applyPreset, isPending: isPresetLoading } = useMutation({
    mutationFn: async (preset: string) => await getUSAStocksPreset(preset),
    onSuccess: (filtered) => {
      queryClient.setQueryData(["usa-stocks"], (old) => ({
        ...(old ?? {}),
        stocks: filtered,
      }));
    },
  });

  const handleApplyPreset = useCallback(
    async (preset: string) => {
      await applyPreset(preset);
    },
    [applyPreset],
  );

  const memoizedColumns = useMemo(() => createUSAColumns(), []);
  const memoizedData = useMemo(() => data?.stocks ?? [], [data?.stocks]);

  if (isLoading || isPresetLoading) return <LoadingState />;

  if (isError) return <ErrorState error={error as Error} />;

  return (
    <Suspense fallback={<LoadingState />}>
      <DataTable
        columns={memoizedColumns}
        data={memoizedData}
        riskDisplay={(USA_RISK_PREMIUM * 100).toFixed(2) + "%"}
        onApplyPreset={handleApplyPreset}
        presets={usaStocksPresets}
        initialColumnVisibility={usaStocksColumnVisibility}
      />
    </Suspense>
  );
}
