"use client";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/DataTable/columns";

export function TableWrapper() {
  const { data, isLoading } = useQuery({
    queryKey: ["parsed-data"],
    queryFn: async () => {
      const res = await fetch("/api/fetch-table-data");
      return res.json();
    },
    //staleTime: 24 * 60 * 60 * 1000, // 1 dia
    //gcTime: 24 * 60 * 60 * 1000, // mantém no cache por 1 dia
    refetchOnWindowFocus: false,
  });

  if (isLoading) return "Carregando...";

  return <DataTable columns={columns} data={data} />;
}
