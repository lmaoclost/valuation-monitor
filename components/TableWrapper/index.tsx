"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState, Suspense, useMemo } from "react";
import {
    getStocksAndComplementary,
} from "@/app/actions/stock.actions";
import { DataTable } from "@/components/DataTable";
import { createColumns } from "@/components/DataTable/columns";
import { LoadingState, ErrorState } from "@/components/ui/states";
import { brStocksColumnVisibility, stocksPresets } from "@/constants";
import { useTranslations, useLocale } from "next-intl";
import type { StocksFormattedDataType } from "@/@types/StocksFormattedDataType";

export function TableWrapper() {
    const [selectedPresets, setSelectedPresets] = useState<string[]>([]);
    const t = useTranslations("Columns");
    const locale = useLocale();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["stocks-and-complementary"],
        queryFn: async () => await getStocksAndComplementary(),
        staleTime: 24 * 60 * 60 * 1000,
        gcTime: 24 * 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    const memoizedColumns = useMemo(() => createColumns(t, locale), [t, locale]);
    const allStocks = useMemo(() => data?.stocks ?? [], [data?.stocks]);

    const filteredData = useMemo(() => {
        if (selectedPresets.length === 0) return allStocks;
        return allStocks.filter((item: StocksFormattedDataType) =>
            selectedPresets.every((key) => {
                const fn = stocksPresets[key as keyof typeof stocksPresets];
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
                complementarData={data?.comp}
                selectedPresets={selectedPresets}
                onSelectedPresetsChange={setSelectedPresets}
                presets={stocksPresets}
                initialColumnVisibility={brStocksColumnVisibility}
            />
        </Suspense>
    );
}
