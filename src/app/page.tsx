import { dataParser } from "@/parsers";
import { DataTable, columns, StatusInvestData } from "./components/table";

async function getData(): Promise<StatusInvestData[]> {
  // Dados de exemplo ou a chamada para sua API
  try {
    const response = await fetch("http://localhost:3000/api/fetch-csv", {
      next: { revalidate: 600 }
    })
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Home() {
  const data = await getData();
  const parsedData = await dataParser(data);

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="w-full bg-gray-900 text-white rounded-lg shadow-lg p-6">
        <main className="flex flex-col gap-8">
          <DataTable columns={columns} data={parsedData} />
        </main>
      </div>
    </div>
  );
}
