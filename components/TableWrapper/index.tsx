"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getStocksAndComplementary,
    getPresetStocks,
} from "@/app/actions/stock.actions";
import { DataTable } from "@/components/DataTable";
import { createColumns } from "@/components/DataTable/columns";
import { useMemo, useCallback } from "react";

function LoadingState() {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="font-body text-muted-foreground">Carregando dados...</p>
            </div>
        </div>
    );
}

function ErrorState({ error }: { error: Error }) {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-2">
                <p className="font-body text-destructive">Erro ao carregar dados</p>
                <p className="font-mono text-xs text-muted-foreground">{error.message}</p>
            </div>
        </div>
    );
}

export function TableWrapper() {
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["stocks-and-complementary"],
        queryFn: async () => await getStocksAndComplementary(),
        staleTime: 24 * 60 * 60 * 1000,
        gcTime: 24 * 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

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
        <DataTable
            columns={memoizedColumns}
            data={memoizedData}
            complementarData={data?.comp}
            onApplyPreset={handleApplyPreset}
        />
    );
}
