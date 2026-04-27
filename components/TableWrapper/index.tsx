"use client";

import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { Suspense } from "react";
import {
    getStocksAndComplementary,
    getPresetStocks,
} from "@/app/actions/stock.actions";
import { DataTable } from "@/components/DataTable";
import { createColumns } from "@/components/DataTable/columns";
import { LoadingState, ErrorState } from "@/components/ui/states";
import { useMemo, useCallback, useEffect } from "react";

export function TableWrapper() {
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error, isFetching } = useQuery({
        queryKey: ["stocks-and-complementary"],
        queryFn: async () => await getStocksAndComplementary(),
        staleTime: 24 * 60 * 60 * 1000,
        gcTime: 24 * 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    // Prefetch preset data on mount for faster preset switching
    useEffect(() => {
        const presets = ["acoes", "small-caps", "mid-caps", "large-caps"];
        presets.forEach((preset) => {
            queryClient.prefetchQuery({
                queryKey: ["preset-stocks", preset],
                queryFn: () => getPresetStocks(preset),
                staleTime: 24 * 60 * 60 * 1000,
            });
        });
    }, [queryClient]);

    const { mutateAsync: applyPreset, isPending: isPresetLoading } =
        useMutation({
            mutationFn: async (preset: string) => await getPresetStocks(preset),
            onSuccess: (filtered) => {
                queryClient.setQueryData(
                    ["stocks-and-complementary"],
                    (old) => ({
                        ...(old ?? {}),
                        stocks: filtered,
                    }),
                );
            },
        });

    const handleApplyPreset = useCallback(async (preset: string) => {
        await applyPreset(preset);
    }, [applyPreset]);

    const memoizedColumns = useMemo(() => createColumns(), []);
    const memoizedData = useMemo(() => data?.stocks ?? [], [data?.stocks]);

    if (isLoading || isPresetLoading) return <LoadingState />;
    
    if (isError) return <ErrorState error={error as Error} />;

    return (
        <Suspense fallback={<LoadingState />}>
            <DataTable
                columns={memoizedColumns}
                data={memoizedData}
                complementarData={data?.comp}
                onApplyPreset={handleApplyPreset}
            />
        </Suspense>
    );
}
