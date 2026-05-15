"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { Suspense } from "react";
import {
  getUSAReitAndComplementary,
  getUSAReitPreset,
} from "@/app/actions/usaReit.actions";
import { DataTable } from "@/components/DataTable";
import { createUSAReitColumns } from "@/components/DataTable/usaReitColumns";
import { LoadingState, ErrorState } from "@/components/ui/states";
import { useMemo, useCallback, useEffect } from "react";
import { usaReitPresets } from "@/constants/usaReitsPresets";
import { usaReitsColumnVisibility } from "@/constants";
import { USA_REIT_RISK_PREMIUM } from "@/lib/marketConfig";

export function USAReitTableWrapper() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["usa-reit"],
    queryFn: async () => await getUSAReitAndComplementary(),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    const presets = ["Discounted", "Discounted PEG"];
    presets.forEach((preset) => {
      queryClient.prefetchQuery({
        queryKey: ["usa-reit-preset", preset],
        queryFn: () => getUSAReitPreset(preset),
        staleTime: 24 * 60 * 60 * 1000,
      });
    });
  }, [queryClient]);

  const { mutateAsync: applyPreset, isPending: isPresetLoading } = useMutation({
    mutationFn: async (preset: string) => await getUSAReitPreset(preset),
    onSuccess: (filtered) => {
      queryClient.setQueryData(["usa-reit"], (old) => ({
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

  const memoizedColumns = useMemo(() => createUSAReitColumns(), []);
  const memoizedData = useMemo(() => data?.stocks ?? [], [data?.stocks]);

  if (isLoading || isPresetLoading) return <LoadingState />;

  if (isError) return <ErrorState error={error as Error} />;

  return (
    <Suspense fallback={<LoadingState />}>
      <DataTable
        columns={memoizedColumns}
        data={memoizedData}
        riskDisplay={(USA_REIT_RISK_PREMIUM * 100).toFixed(2) + "%"}
        onApplyPreset={handleApplyPreset}
        presets={usaReitPresets}
        initialColumnVisibility={usaReitsColumnVisibility}
      />
    </Suspense>
  );
}
