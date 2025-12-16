"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getStocksAndComplementary,
    getPresetStocks,
} from "@/app/actions/stock.actions";
import { DataTable } from "@/components/DataTable";
import { createColumns } from "@/components/DataTable/columns";
import { useMemo } from "react";

export function TableWrapper() {
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
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

    const memoizedColumns = useMemo(() => createColumns(), []);
    const memoizedData = useMemo(() => data?.stocks ?? [], [data?.stocks]);

    if (isLoading || isPresetLoading) return "Carregando...";

    return (
        <DataTable
            columns={memoizedColumns}
            data={memoizedData}
            complementarData={data?.comp}
            onApplyPreset={applyPreset}
        />
    );
}
