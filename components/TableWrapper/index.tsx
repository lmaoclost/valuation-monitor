"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getStocksAndComplementary,
  getPresetStocks,
} from "@/app/actions/stock.actions";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/DataTable/columns";

export function TableWrapper() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["stocks-and-complementary"],
    queryFn: async () => await getStocksAndComplementary(),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const applyPreset = async (preset: string) => {
    const filtered = await getPresetStocks(preset);

    queryClient.setQueryData(["stocks-and-complementary"], (old) => ({
      ...(old ?? {}),
      stocks: filtered,
    }));
  };

  if (isLoading) return "Carregando...";

  return (
    <DataTable
      columns={columns}
      data={data?.stocks}
      complementarData={data?.comp}
      onApplyPreset={applyPreset}
    />
  );
}
