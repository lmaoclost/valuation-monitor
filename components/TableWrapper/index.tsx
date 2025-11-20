"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/DataTable/columns";

export function TableWrapper() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["stocks-and-complementary"],
    queryFn: async () => {
      const [stocksRes, compRes] = await Promise.all([
        fetch("/api/fetch-stocks"),
        fetch("/api/fetch-complementar-data"),
      ]);

      const [stocks, comp] = await Promise.all([
        stocksRes.json(),
        compRes.json(),
      ]);

      // Se precisar mesclar os dois datasets, faça aqui
      return { stocks, comp };
    },
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const applyPreset = async (preset: string) => {
    const response = await fetch(
      `/api/fetch-preset-stocks/filter?preset=${preset}`,
    );
    const filtered = await response.json();

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
