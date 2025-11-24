import { TableWrapper } from "@/components/TableWrapper";

export default async function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="w-full bg-gray-900 text-white rounded-lg shadow-lg p-6">
        <main className="flex flex-col gap-8">
          <TableWrapper />
        </main>
      </div>
    </div>
  );
}
